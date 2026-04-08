package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"auth-service-go/internal/response"
	"auth-service-go/internal/service"
)

const (
	TokenContextKey string = "token"
	UserContextKey  string = "user"
)

func JWTMiddleware(jwtService *service.JWTService, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		authHeader := r.Header.Get("Authorization")

		if !strings.HasPrefix(authHeader, "Bearer ") {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)

			json.NewEncoder(w).Encode(response.ErrorResponse{
				Status:  http.StatusUnauthorized,
				Message: "Token inválido ou ausente",
			})
			return
		}

		token := authHeader[7:]

		claims, err := jwtService.ValidateToken(token)
		if err != nil {
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)

			json.NewEncoder(w).Encode(response.ErrorResponse{
				Status:  http.StatusUnauthorized,
				Message: "Token inválido",
			})
			return
		}

		ctx := context.WithValue(r.Context(), TokenContextKey, token)
		ctx = context.WithValue(ctx, UserContextKey, claims)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
