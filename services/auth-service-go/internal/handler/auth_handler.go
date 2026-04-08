package handler

import (
	"encoding/json"
	"net/http"

	"auth-service-go/internal/error"
	"auth-service-go/internal/middleware"
	"auth-service-go/internal/model"
	"auth-service-go/internal/response"
	"auth-service-go/internal/service"
)

type AuthHandler struct {
	authService *service.AuthService
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type TokenResponse struct {
	Token string `json:"token"`
}

type RegisterRequest struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {

	var req LoginRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response.ErrorResponse{
			Status:  http.StatusBadRequest,
			Message: "Request inválido",
		})
		return
	}

	if req.Email == "" || req.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response.ErrorResponse{
			Status:  http.StatusBadRequest,
			Message: "E-mail e senha são obrigatórios",
		})
		return
	}

	token, err := h.authService.Login(req.Email, req.Password)

	if err != nil {

		if appErr, ok := err.(*error.HttpError); ok {

			w.Header().Set("Content-Type", "application/json")
			status := appErr.Status
			if status == 0 {
				status = http.StatusInternalServerError
			}

			w.WriteHeader(status)

			json.NewEncoder(w).Encode(response.ErrorResponse{
				Status:  status,
				Message: appErr.Message,
			})

			return
		}

		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response.ErrorResponse{
			Status:  http.StatusInternalServerError,
			Message: err.Error(),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(TokenResponse{
		Token: token,
	})
}

func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest

	err := json.NewDecoder(r.Body).Decode(&req)

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response.ErrorResponse{
			Status:  http.StatusBadRequest,
			Message: "Request inválido",
		})
		return
	}

	if req.Email == "" || req.Username == "" || req.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response.ErrorResponse{
			Status:  http.StatusBadRequest,
			Message: "E-mail, username e senha são obrigatórios",
		})
		return
	}

	token, err := h.authService.Register(req.Email, req.Username, req.Password)

	if err != nil {

		if appErr, ok := err.(*error.HttpError); ok {

			w.Header().Set("Content-Type", "application/json")
			status := appErr.Status
			if status == 0 {
				status = http.StatusInternalServerError
			}

			w.WriteHeader(status)

			json.NewEncoder(w).Encode(response.ErrorResponse{
				Status:  status,
				Message: appErr.Message,
			})

			return
		}

		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response.ErrorResponse{
			Status:  http.StatusInternalServerError,
			Message: err.Error(),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(TokenResponse{
		Token: token,
	})
}

func (h *AuthHandler) Me(w http.ResponseWriter, r *http.Request) {
	token := r.Context().Value(middleware.TokenContextKey).(string)

	user, err := h.authService.Me(token)

	if err != nil {
		if appErr, ok := err.(*error.HttpError); ok {

			w.Header().Set("Content-Type", "application/json")
			status := appErr.Status
			if status == 0 {
				status = http.StatusInternalServerError
			}

			w.WriteHeader(status)

			json.NewEncoder(w).Encode(response.ErrorResponse{
				Status:  status,
				Message: appErr.Message,
			})

			return
		}

		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response.ErrorResponse{
			Status:  http.StatusInternalServerError,
			Message: err.Error(),
		})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(model.UserResponse{
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
	})
}
