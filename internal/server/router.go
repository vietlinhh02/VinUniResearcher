package server

import (
	"net/http"

	"gorm.io/gorm"

	"github.com/vinuni/mentee/internal/config"
	"github.com/vinuni/mentee/internal/modules/auth"
	"github.com/vinuni/mentee/internal/modules/health"
	"github.com/vinuni/mentee/internal/modules/user"
)

// newRouter builds the root HTTP handler with middleware and module routes.
// Register new modules here.
func newRouter(cfg config.Config, db *gorm.DB) http.Handler {
	mux := http.NewServeMux()

	health.RegisterRoutes(mux, db)

	userRepo := user.NewRepository(db)
	userService := user.NewService(userRepo)
	user.NewHandler(userService).RegisterRoutes(mux)

	authRepo := auth.NewRepository(db)
	authService := auth.NewService(authRepo, userRepo)
	auth.NewHandler(authService, cfg.Env == "production").RegisterRoutes(mux)

	return chain(mux, logging, recoverer, cors(cfg.HTTP.CORSOrigin))
}
