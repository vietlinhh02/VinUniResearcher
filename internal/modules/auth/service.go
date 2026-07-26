package auth

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/vinuni/mentee/internal/modules/user"
)

// SessionTTL is how long a login session stays valid.
const SessionTTL = 7 * 24 * time.Hour

// MinPasswordLength is the minimum accepted password length.
const MinPasswordLength = 8

// ErrInvalidInput is returned when the request payload fails validation.
var ErrInvalidInput = errors.New("invalid input")

// ErrInvalidCredentials is returned when email or password is wrong.
var ErrInvalidCredentials = errors.New("invalid email or password")

// ErrInvalidSession is returned when the session token is missing, unknown,
// or expired.
var ErrInvalidSession = errors.New("invalid or expired session")

// Service contains authentication business logic.
type Service struct {
	sessions Repository
	users    user.Repository
}

// NewService returns a Service backed by the session and user repositories.
func NewService(sessions Repository, users user.Repository) *Service {
	return &Service{sessions: sessions, users: users}
}

// Register creates a new user with a hashed password and opens a session.
// It returns the created user and the raw session token for the cookie.
func (s *Service) Register(ctx context.Context, req RegisterRequest) (*user.User, string, error) {
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	req.Name = strings.TrimSpace(req.Name)

	if !strings.Contains(req.Email, "@") || req.Name == "" {
		return nil, "", ErrInvalidInput
	}
	if len(req.Password) < MinPasswordLength {
		return nil, "", ErrInvalidInput
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, "", err
	}

	u := &user.User{Email: req.Email, Name: req.Name, PasswordHash: string(hash)}
	if err := s.users.Create(ctx, u); err != nil {
		return nil, "", err
	}

	token, err := s.openSession(ctx, u.ID)
	if err != nil {
		return nil, "", err
	}
	return u, token, nil
}

// Login verifies credentials and opens a session. It returns the user and
// the raw session token for the cookie.
func (s *Service) Login(ctx context.Context, req LoginRequest) (*user.User, string, error) {
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))

	u, err := s.users.GetByEmail(ctx, req.Email)
	if errors.Is(err, user.ErrNotFound) {
		return nil, "", ErrInvalidCredentials
	}
	if err != nil {
		return nil, "", err
	}

	if bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(req.Password)) != nil {
		return nil, "", ErrInvalidCredentials
	}

	token, err := s.openSession(ctx, u.ID)
	if err != nil {
		return nil, "", err
	}
	return u, token, nil
}

// Authenticate resolves a raw session token to its user, returning
// ErrInvalidSession for unknown or expired tokens.
func (s *Service) Authenticate(ctx context.Context, token string) (*user.User, error) {
	if token == "" {
		return nil, ErrInvalidSession
	}

	hash := hashToken(token)
	session, err := s.sessions.GetSession(ctx, hash)
	if errors.Is(err, ErrSessionNotFound) {
		return nil, ErrInvalidSession
	}
	if err != nil {
		return nil, err
	}

	if time.Now().After(session.ExpiresAt) {
		_ = s.sessions.DeleteSession(ctx, hash)
		return nil, ErrInvalidSession
	}

	u, err := s.users.GetByID(ctx, session.UserID)
	if errors.Is(err, user.ErrNotFound) {
		return nil, ErrInvalidSession
	}
	if err != nil {
		return nil, err
	}
	return u, nil
}

// Logout deletes the session for the given raw token.
func (s *Service) Logout(ctx context.Context, token string) error {
	if token == "" {
		return nil
	}
	return s.sessions.DeleteSession(ctx, hashToken(token))
}

// openSession creates a session row and returns the raw token.
func (s *Service) openSession(ctx context.Context, userID int64) (string, error) {
	raw := make([]byte, 32)
	if _, err := rand.Read(raw); err != nil {
		return "", err
	}
	token := hex.EncodeToString(raw)

	session := &Session{
		TokenHash: hashToken(token),
		UserID:    userID,
		ExpiresAt: time.Now().Add(SessionTTL),
	}
	if err := s.sessions.CreateSession(ctx, session); err != nil {
		return "", err
	}
	return token, nil
}

func hashToken(token string) string {
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
}
