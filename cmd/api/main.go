// Command api runs the VinUni Researcher backend server.
package main

import (
	"context"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/vinuni/mentee/internal/config"
	"github.com/vinuni/mentee/internal/platform/database"
	"github.com/vinuni/mentee/internal/server"
)

func main() {
	slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))

	if err := run(); err != nil {
		slog.Error("application exited with error", "error", err)
		os.Exit(1)
	}
}

func run() error {
	cfg := config.Load()

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	db, err := database.NewPostgres(ctx, cfg.DB.DSN())
	if err != nil {
		return err
	}
	sqlDB, err := db.DB()
	if err != nil {
		return err
	}
	defer sqlDB.Close()

	slog.Info("connected to database", "host", cfg.DB.Host, "db", cfg.DB.Name)
	return server.New(cfg, db).Run(ctx)
}
