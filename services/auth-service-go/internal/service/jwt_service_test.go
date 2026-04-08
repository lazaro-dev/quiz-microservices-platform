package service

import (
	"auth-service-go/internal/model"
	"os"
	"testing"
)

func TestGenerateToken(t *testing.T) {

	os.Setenv("JWT_SECRET", "test-secret")

	jwtService := NewJWTService()

	user := &model.UserWithPassword{
		ID:       1,
		Username: "lazaro",
		Role:     "USER",
	}

	token, err := jwtService.Generate(user)

	if err != nil {
		t.Fatalf("Erro ao gerar token: %v", err)
	}

	if token == "" {
		t.Fatal("token não deveria ser vazio")
	}
}

func TestGenerateAndValidateToken(t *testing.T) {

	os.Setenv("JWT_SECRET", "test-secret")

	jwtService := NewJWTService()

	user := &model.UserWithPassword{
		ID:       10,
		Username: "lazaro",
		Role:     "ADMIN",
	}

	token, err := jwtService.Generate(user)
	if err != nil {
		t.Fatalf("Erro ao gerar token: %v", err)
	}

	claims, err := jwtService.ValidateToken(token)

	if err != nil {
		t.Fatalf("Erro ao validar token: %v", err)
	}

	if claims.UserID != "10" {
		t.Errorf("UserID esperado 10 mas veio %s", claims.UserID)
	}

	if claims.Username != "lazaro" {
		t.Errorf("Username esperado lazaro mas veio %s", claims.Username)
	}

	if claims.Role != "ADMIN" {
		t.Errorf("Role esperado ADMIN mas veio %s", claims.Role)
	}
}

func TestValidateInvalidToken(t *testing.T) {

	os.Setenv("JWT_SECRET", "test-secret")

	jwtService := NewJWTService()

	_, err := jwtService.ValidateToken("token-invalido")

	if err == nil {
		t.Fatal("Erro token inválido")
	}
}

func TestTokenWithWrongSecret(t *testing.T) {

	os.Setenv("JWT_SECRET", "secret1")

	jwt1 := NewJWTService()

	user := &model.UserWithPassword{
		ID: 1,
	}

	token, _ := jwt1.Generate(user)

	os.Setenv("JWT_SECRET", "secret2")

	jwt2 := NewJWTService()

	_, err := jwt2.ValidateToken(token)

	if err == nil {
		t.Fatal("Falha com secret diferente")
	}
}
