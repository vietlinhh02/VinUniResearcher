package auth

import (
	"errors"
	"net/http"
	"time"

	"github.com/vinuni/mentee/internal/modules/user"
	"github.com/vinuni/mentee/internal/platform/httpapi"
)

// SessionCookieName is the cookie carrying the raw session token.
const SessionCookieName = "mentee_session"

// Handler exposes authentication endpoints over HTTP.
type Handler struct {
	service       *Service
	secureCookies bool
}

// NewHandler returns a Handler backed by service. secureCookies marks the
// session cookie Secure (HTTPS-only) and should be true outside development.
func NewHandler(service *Service, secureCookies bool) *Handler {
	return &Handler{service: service, secureCookies: secureCookies}
}

// RegisterRoutes registers auth endpoints on the mux.
func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("POST /api/v1/auth/register", h.register)
	mux.HandleFunc("POST /api/v1/auth/login", h.login)
	mux.HandleFunc("POST /api/v1/auth/logout", h.logout)
	mux.HandleFunc("GET /api/v1/auth/me", h.me)
}

func (h *Handler) register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := httpapi.Decode(r, &req); err != nil {
		httpapi.Error(w, http.StatusBadRequest, "invalid JSON body")
		return
	}

	u, token, err := h.service.Register(r.Context(), req)
	if err != nil {
		h.writeServiceError(w, err)
		return
	}
	h.setSessionCookie(w, token)
	httpapi.JSON(w, http.StatusCreated, u)
}

func (h *Handler) login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := httpapi.Decode(r, &req); err != nil {
		httpapi.Error(w, http.StatusBadRequest, "invalid JSON body")
		return
	}

	u, token, err := h.service.Login(r.Context(), req)
	if err != nil {
		h.writeServiceError(w, err)
		return
	}
	h.setSessionCookie(w, token)
	httpapi.JSON(w, http.StatusOK, u)
}

func (h *Handler) logout(w http.ResponseWriter, r *http.Request) {
	if err := h.service.Logout(r.Context(), h.sessionToken(r)); err != nil {
		h.writeServiceError(w, err)
		return
	}
	h.clearSessionCookie(w)
	httpapi.JSON(w, http.StatusNoContent, nil)
}

func (h *Handler) me(w http.ResponseWriter, r *http.Request) {
	u, err := h.service.Authenticate(r.Context(), h.sessionToken(r))
	if err != nil {
		h.writeServiceError(w, err)
		return
	}
	httpapi.JSON(w, http.StatusOK, u)
}

// sessionToken reads the raw session token from the cookie, if present.
func (h *Handler) sessionToken(r *http.Request) string {
	cookie, err := r.Cookie(SessionCookieName)
	if err != nil {
		return ""
	}
	return cookie.Value
}

func (h *Handler) setSessionCookie(w http.ResponseWriter, token string) {
	http.SetCookie(w, &http.Cookie{
		Name:     SessionCookieName,
		Value:    token,
		Path:     "/",
		Expires:  time.Now().Add(SessionTTL),
		MaxAge:   int(SessionTTL / time.Second),
		HttpOnly: true,
		Secure:   h.secureCookies,
		SameSite: http.SameSiteLaxMode,
	})
}

func (h *Handler) clearSessionCookie(w http.ResponseWriter) {
	http.SetCookie(w, &http.Cookie{
		Name:     SessionCookieName,
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		HttpOnly: true,
		Secure:   h.secureCookies,
		SameSite: http.SameSiteLaxMode,
	})
}

func (h *Handler) writeServiceError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, ErrInvalidInput):
		httpapi.Error(w, http.StatusBadRequest, err.Error())
	case errors.Is(err, ErrInvalidCredentials), errors.Is(err, ErrInvalidSession):
		httpapi.Error(w, http.StatusUnauthorized, err.Error())
	case errors.Is(err, user.ErrDuplicateEmail):
		httpapi.Error(w, http.StatusConflict, err.Error())
	default:
		httpapi.Error(w, http.StatusInternalServerError, "internal server error")
	}
}
