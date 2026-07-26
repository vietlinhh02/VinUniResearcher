// Package config loads application configuration from environment variables.
package config

import (
	"fmt"
	"os"
	"strconv"
)

// Config holds all application configuration.
type Config struct {
	Env  string
	HTTP HTTPConfig
	DB   DBConfig
}

// HTTPConfig holds HTTP server settings.
type HTTPConfig struct {
	Port int
	// CORSOrigin is the browser origin allowed to call the API with
	// credentials (the frontend dev server in development).
	CORSOrigin string
}

// DBConfig holds PostgreSQL connection settings.
type DBConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	Name     string
	SSLMode  string
}

// DSN returns the PostgreSQL connection string.
func (c DBConfig) DSN() string {
	return fmt.Sprintf("postgres://%s:%s@%s:%d/%s?sslmode=%s",
		c.User, c.Password, c.Host, c.Port, c.Name, c.SSLMode)
}

// Load reads configuration from environment variables, applying defaults
// suitable for local development.
func Load() Config {
	return Config{
		Env: getEnv("APP_ENV", "development"),
		HTTP: HTTPConfig{
			Port:       getEnvInt("HTTP_PORT", 8080),
			CORSOrigin: getEnv("CORS_ORIGIN", "http://localhost:3000"),
		},
		DB: DBConfig{
			Host:     getEnv("POSTGRES_HOST", "localhost"),
			Port:     getEnvInt("POSTGRES_PORT", 5432),
			User:     getEnv("POSTGRES_USER", "postgres"),
			Password: getEnv("POSTGRES_PASSWORD", "postgres"),
			Name:     getEnv("POSTGRES_DB", "mentee"),
			SSLMode:  getEnv("POSTGRES_SSLMODE", "disable"),
		},
	}
}

func getEnv(key, fallback string) string {
	if value, ok := os.LookupEnv(key); ok {
		return value
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	value, ok := os.LookupEnv(key)
	if !ok {
		return fallback
	}
	parsed, err := strconv.Atoi(value)
	if err != nil {
		return fallback
	}
	return parsed
}
