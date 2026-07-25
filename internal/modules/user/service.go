package user

import (
	"context"
	"errors"
	"strings"
)

// ErrInvalidInput is returned when the request payload fails validation.
var ErrInvalidInput = errors.New("invalid input")

// Service contains user business logic.
type Service struct {
	repo Repository
}

// NewService returns a Service backed by repo.
func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

// Create validates input and registers a new user.
func (s *Service) Create(ctx context.Context, req CreateUserRequest) (*User, error) {
	req.Email = strings.TrimSpace(strings.ToLower(req.Email))
	req.Name = strings.TrimSpace(req.Name)

	if !strings.Contains(req.Email, "@") {
		return nil, ErrInvalidInput
	}
	if req.Name == "" {
		return nil, ErrInvalidInput
	}

	u := &User{Email: req.Email, Name: req.Name}
	if err := s.repo.Create(ctx, u); err != nil {
		return nil, err
	}
	return u, nil
}

// GetByID fetches a user by ID.
func (s *Service) GetByID(ctx context.Context, id int64) (*User, error) {
	return s.repo.GetByID(ctx, id)
}
