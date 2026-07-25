// Package health exposes the service health endpoint.
package health

import (
	"context"
	"net/http"
	"time"

	"gorm.io/gorm"

	"github.com/vinuni/mentee/internal/platform/httpapi"
)

type statusResponse struct {
	Status   string `json:"status"`
	Database string `json:"database"`
}

// RegisterRoutes registers health endpoints on the mux.
func RegisterRoutes(mux *http.ServeMux, db *gorm.DB) {
	mux.HandleFunc("GET /healthz", handler(db))
}

func handler(db *gorm.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		dbStatus := "up"

		ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
		defer cancel()

		sqlDB, err := db.DB()
		if err != nil || sqlDB.PingContext(ctx) != nil {
			dbStatus = "down"
		}

		status := http.StatusOK
		if dbStatus == "down" {
			status = http.StatusServiceUnavailable
		}
		httpapi.JSON(w, status, statusResponse{Status: "ok", Database: dbStatus})
	}
}
