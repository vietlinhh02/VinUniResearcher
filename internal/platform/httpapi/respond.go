// Package httpapi provides shared HTTP helpers for JSON APIs.
package httpapi

import (
	"encoding/json"
	"log/slog"
	"net/http"
)

// ErrorResponse is the standard error body returned by the API.
type ErrorResponse struct {
	Error string `json:"error"`
}

// JSON writes data as a JSON response with the given status code.
func JSON(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	if data == nil {
		return
	}
	if err := json.NewEncoder(w).Encode(data); err != nil {
		slog.Error("failed to encode response", "error", err)
	}
}

// Error writes a JSON error response with the given status code and message.
func Error(w http.ResponseWriter, status int, message string) {
	JSON(w, status, ErrorResponse{Error: message})
}

// Decode reads the request body as JSON into dst.
func Decode(r *http.Request, dst any) error {
	return json.NewDecoder(r.Body).Decode(dst)
}
