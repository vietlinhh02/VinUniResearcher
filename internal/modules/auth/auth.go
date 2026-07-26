// Package auth implements session-based authentication: registration, login,
// logout, and current-user lookup, following the layered module layout of
// this monolith.
package auth

import "time"

// Session is the domain model for a server-side login session. The raw token
// lives only in the client cookie; the database stores its SHA-256 hash.
type Session struct {
	TokenHash string    `json:"-"`
	UserID    int64     `json:"-"`
	ExpiresAt time.Time `json:"-"`
	CreatedAt time.Time `json:"-"`
}

// RegisterRequest is the payload for registering a new account.
type RegisterRequest struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

// LoginRequest is the payload for logging in.
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
