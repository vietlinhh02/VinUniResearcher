-include .env
export

APP_NAME       := mentee
MIGRATIONS_DIR := $(CURDIR)/migrations
DATABASE_URL   := postgres://$(POSTGRES_USER):$(POSTGRES_PASSWORD)@$(POSTGRES_HOST):$(POSTGRES_PORT)/$(POSTGRES_DB)?sslmode=$(POSTGRES_SSLMODE)
MIGRATE        := docker run --rm --network host -v $(MIGRATIONS_DIR):/migrations migrate/migrate:v4.19.1

.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help
	@awk 'BEGIN {FS = ":.*## "}; /^[a-zA-Z_-]+:.*## / {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# ---------- Application ----------

.PHONY: run
run: ## Run the backend server
	go run ./cmd/api

.PHONY: build
build: ## Build the backend binary into bin/
	go build -o bin/$(APP_NAME) ./cmd/api

.PHONY: test
test: ## Run all tests
	go test ./...

.PHONY: vet
vet: ## Run go vet
	go vet ./...

.PHONY: fmt
fmt: ## Format Go code
	gofmt -w .

.PHONY: tidy
tidy: ## Tidy go.mod
	go mod tidy

# ---------- Database (Docker) ----------

.PHONY: db-up
db-up: ## Start PostgreSQL and wait until healthy
	docker compose up -d --wait postgres

.PHONY: db-down
db-down: ## Stop PostgreSQL
	docker compose down

.PHONY: db-reset
db-reset: ## Stop PostgreSQL and delete all data
	docker compose down -v

.PHONY: db-logs
db-logs: ## Tail PostgreSQL logs
	docker compose logs -f postgres

.PHONY: db-psql
db-psql: ## Open a psql shell in the PostgreSQL container
	docker exec -it mentee-postgres psql -U $(POSTGRES_USER) -d $(POSTGRES_DB)

# ---------- Migrations ----------

.PHONY: migrate-up
migrate-up: ## Apply all pending migrations
	$(MIGRATE) -path=/migrations -database "$(DATABASE_URL)" up

.PHONY: migrate-down
migrate-down: ## Roll back the last migration
	$(MIGRATE) -path=/migrations -database "$(DATABASE_URL)" down 1

.PHONY: migrate-version
migrate-version: ## Show current migration version
	$(MIGRATE) -path=/migrations -database "$(DATABASE_URL)" version

.PHONY: migrate-create
migrate-create: ## Create a migration pair: make migrate-create NAME=create_posts_table
	@if [ -z "$(NAME)" ]; then echo "Usage: make migrate-create NAME=create_posts_table"; exit 1; fi
	docker run --rm -v $(MIGRATIONS_DIR):/migrations migrate/migrate:v4.19.1 \
		create -ext sql -dir /migrations -seq $(NAME)

# ---------- Workflows ----------

.PHONY: setup
setup: ## Copy .env.example to .env if missing
	@test -f .env || (cp .env.example .env && echo "Created .env from .env.example")

.PHONY: dev
dev: setup db-up migrate-up run ## Start DB, run migrations, then start the server
