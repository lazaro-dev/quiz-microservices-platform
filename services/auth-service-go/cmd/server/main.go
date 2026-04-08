package main

import (
	"net/http"

	"auth-service-go/internal/client"
	"auth-service-go/internal/handler"
	"auth-service-go/internal/middleware"
	"auth-service-go/internal/service"
)

func main() {

	userClient := client.NewUserClient()

	jwtService := service.NewJWTService()

	authService := service.NewAuthService(userClient, jwtService)

	authHandler := handler.NewAuthHandler(authService)

	tokenHandler := handler.NewTokenHandler(jwtService)

	mux := http.NewServeMux()

	mux.HandleFunc("POST /auth/login", authHandler.Login)
	mux.HandleFunc("POST /auth/register", authHandler.Register)
	// mux.Handle("GET /auth/me",
	// 	middleware.JWTMiddleware(jwtService, http.HandlerFunc(authHandler.Me)),
	// )
	mux.Handle("POST /auth/token/refresh",
		middleware.JWTMiddleware(jwtService, http.HandlerFunc(tokenHandler.Refresh)),
	)

	mux.Handle("POST /auth/token/validate",
		middleware.JWTMiddleware(jwtService, http.HandlerFunc(tokenHandler.Validate)),
	)

	http.ListenAndServe(":8080", mux)
}
