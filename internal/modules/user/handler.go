package user

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/vinuni/mentee/internal/platform/httpapi"
)

// Handler exposes user endpoints over HTTP.
type Handler struct {
	service *Service
}

// NewHandler returns a Handler backed by service.
func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// RegisterRoutes registers user endpoints on the mux.
func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("POST /api/v1/users", h.create)
	mux.HandleFunc("GET /api/v1/users/{id}", h.getByID)
}

func (h *Handler) create(w http.ResponseWriter, r *http.Request) {
	var req CreateUserRequest
	if err := httpapi.Decode(r, &req); err != nil {
		httpapi.Error(w, http.StatusBadRequest, "invalid JSON body")
		return
	}

	u, err := h.service.Create(r.Context(), req)
	if err != nil {
		h.writeServiceError(w, err)
		return
	}
	httpapi.JSON(w, http.StatusCreated, u)
}

func (h *Handler) getByID(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
	if err != nil || id <= 0 {
		httpapi.Error(w, http.StatusBadRequest, "invalid user id")
		return
	}

	u, err := h.service.GetByID(r.Context(), id)
	if err != nil {
		h.writeServiceError(w, err)
		return
	}
	httpapi.JSON(w, http.StatusOK, u)
}

func (h *Handler) writeServiceError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, ErrInvalidInput):
		httpapi.Error(w, http.StatusBadRequest, err.Error())
	case errors.Is(err, ErrDuplicateEmail):
		httpapi.Error(w, http.StatusConflict, err.Error())
	case errors.Is(err, ErrNotFound):
		httpapi.Error(w, http.StatusNotFound, err.Error())
	default:
		httpapi.Error(w, http.StatusInternalServerError, "internal server error")
	}
}
