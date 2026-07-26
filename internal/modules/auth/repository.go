package auth

import (
	"context"
	"errors"

	"gorm.io/gorm"
)

// ErrSessionNotFound is returned when a session does not exist.
var ErrSessionNotFound = errors.New("session not found")

// Repository defines session persistence operations.
type Repository interface {
	CreateSession(ctx context.Context, s *Session) error
	GetSession(ctx context.Context, tokenHash string) (*Session, error)
	DeleteSession(ctx context.Context, tokenHash string) error
}

type gormRepository struct {
	db *gorm.DB
}

// NewRepository returns a GORM-backed Repository.
func NewRepository(db *gorm.DB) Repository {
	return &gormRepository{db: db}
}

// CreateSession inserts a new session.
func (r *gormRepository) CreateSession(ctx context.Context, s *Session) error {
	return r.db.WithContext(ctx).Create(s).Error
}

// GetSession fetches a session by token hash, returning ErrSessionNotFound
// if missing.
func (r *gormRepository) GetSession(ctx context.Context, tokenHash string) (*Session, error) {
	var s Session
	err := r.db.WithContext(ctx).Where("token_hash = ?", tokenHash).First(&s).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, ErrSessionNotFound
	}
	if err != nil {
		return nil, err
	}
	return &s, nil
}

// DeleteSession removes a session by token hash. Deleting a missing session
// is not an error.
func (r *gormRepository) DeleteSession(ctx context.Context, tokenHash string) error {
	return r.db.WithContext(ctx).Where("token_hash = ?", tokenHash).Delete(&Session{}).Error
}
