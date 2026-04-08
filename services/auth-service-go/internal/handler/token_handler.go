package handler

import (
	"auth-service-go/internal/middleware"
	"auth-service-go/internal/response"
	"auth-service-go/internal/service"
	"encoding/json"
	"net/http"
)

type TokenHandler struct {
	tokenService *service.JWTService
}

func NewTokenHandler(tokenService *service.JWTService) *TokenHandler {
	return &TokenHandler{
		tokenService: tokenService,
	}
}

func (h *TokenHandler) Refresh(w http.ResponseWriter, r *http.Request) {
	token := r.Context().Value(middleware.TokenContextKey).(string)

	result, err := h.tokenService.GenerateRefreshToken(token)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response.ErrorResponse{
			Status:  http.StatusInternalServerError,
			Message: err.Error(),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(TokenResponse{
		Token: result,
	})
}

func (h *TokenHandler) Validate(w http.ResponseWriter, r *http.Request) {
	token := r.Context().Value(middleware.TokenContextKey).(string)

	result, err := h.tokenService.ValidateToken(token)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response.ErrorResponse{
			Status:  http.StatusInternalServerError,
			Message: err.Error(),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	json.NewEncoder(w).Encode(result)
}
