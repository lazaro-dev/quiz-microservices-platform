package service

import (
	"auth-service-go/internal/model"
	"auth-service-go/internal/security"
	"auth-service-go/internal/service/mock"
	"testing"
)

func TestAuthServiceLoginSuccess(t *testing.T) {

	jwtService := NewJWTService()

	hashedPassword, err := security.HashPassword("password")
	if err != nil {
		t.Fatalf("hash deveria funcionar: %v", err)
	}

	mockClient := &mock.MockUserClient{
		User: &model.UserWithPassword{
			ID:           1,
			Username:     "lazaro",
			PasswordHash: hashedPassword,
			Role:         "USER",
		},
	}

	service := NewAuthService(mockClient, jwtService)

	token, err := service.Login("test@email.com", "password")

	if err != nil {
		t.Fatalf("login deveria funcionar: %v", err)
	}

	if token == "" {
		t.Fatal("token não deveria ser vazio")
	}
}

func TestAuthServiceLoginInvalidPassword(t *testing.T) {

	jwtService := NewJWTService()

	mockClient := &mock.MockUserClient{
		User: &model.UserWithPassword{
			ID:           1,
			Username:     "lazaro",
			PasswordHash: "$2a$10$hash",
			Role:         "USER",
		},
	}

	service := NewAuthService(mockClient, jwtService)

	_, err := service.Login("email", "senhaErrada")

	if err == nil {
		t.Fatal("era esperado erro para senha inválida")
	}
}

func TestAuthServiceRegister(t *testing.T) {

	jwtService := NewJWTService()

	mockClient := &mock.MockUserClient{}

	service := NewAuthService(mockClient, jwtService)

	token, err := service.Register(
		"lazaro@email.com",
		"lazaro",
		"password",
	)

	if err != nil {
		t.Fatalf("register falhou: %v", err)
	}

	if token == "" {
		t.Fatal("token deveria ser gerado")
	}
}
