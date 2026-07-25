package server

import (
	"net/http"

	"gorm.io/gorm"

	"github.com/vinuni/mentee/internal/modules/health"
	"github.com/vinuni/mentee/internal/modules/user"
)

// newRouter builds the root HTTP handler with middleware and module routes.
// Register new modules here.
func newRouter(db *gorm.DB) http.Handler {
	mux := http.NewServeMux()

	health.RegisterRoutes(mux, db)

	userRepo := user.NewRepository(db)
	userService := user.NewService(userRepo)
	user.NewHandler(userService).RegisterRoutes(mux)

	return chain(mux, logging, recoverer)
}
