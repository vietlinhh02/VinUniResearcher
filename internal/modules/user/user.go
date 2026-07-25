// Package user implements the user module: HTTP transport, business logic,
// and persistence, following the layered module layout of this monolith.
package user

import "time"

// User is the domain model for a registered user.
type User struct {
	ID        int64     `json:"id"`
	Email     string    `json:"email"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// CreateUserRequest is the payload for creating a user.
type CreateUserRequest struct {
	Email string `json:"email"`
	Name  string `json:"name"`
}
