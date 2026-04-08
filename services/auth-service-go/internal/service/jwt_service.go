package service

import (
	"auth-service-go/internal/model"
	"errors"
	"fmt"
	"os"
	"time"

	jwtLib "github.com/golang-jwt/jwt/v5"
)

type JWTService struct {
	secret string
}

func NewJWTService() *JWTService {
	return &JWTService{
		secret: os.Getenv("JWT_SECRET"),
	}
}

type Claims struct {
	UserID   string
	Username string
	Role     string
}

func (j *JWTService) Generate(user *model.UserWithPassword) (string, error) {
	// log.Printf("Gerando token para o usuário %s", user.Username)
	// log.Printf("Gerando token para o usuário %s", user.ID)
	// log.Printf("Gerando token para o usuário %s", user.Role)

	data := jwtLib.MapClaims{
		"sub":      fmt.Sprint(user.ID),
		"username": user.Username,
		"role":     user.Role,
		"exp":      time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwtLib.NewWithClaims(jwtLib.SigningMethodHS256, data)

	return token.SignedString([]byte(j.secret))
}

func (j *JWTService) GenerateRefreshToken(tokenString string) (string, error) {

	token, err := jwtLib.Parse(tokenString, func(token *jwtLib.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwtLib.SigningMethodHMAC); !ok {
			return nil, errors.New("Assinatura de inválida")
		}

		return []byte(j.secret), nil
	})

	if err != nil {
		return "", err
	}

	if !token.Valid {
		return "", errors.New("Token inválido")
	}

	claims, ok := token.Claims.(jwtLib.MapClaims)
	if !ok {
		return "", errors.New("Dados inválidos")
	}

	data := jwtLib.MapClaims{
		"sub":      fmt.Sprint(claims["sub"]),
		"username": claims["username"],
		"role":     claims["role"],
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	}

	newToken := jwtLib.NewWithClaims(jwtLib.SigningMethodHS256, data)

	return newToken.SignedString([]byte(j.secret))
}

func (j *JWTService) ValidateToken(tokenString string) (*Claims, error) {

	token, err := jwtLib.Parse(tokenString, func(token *jwtLib.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwtLib.SigningMethodHMAC); !ok {
			return nil, errors.New("Assinatura de inválida")
		}

		return []byte(j.secret), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, errors.New("Token inválido")
	}

	claims, ok := token.Claims.(jwtLib.MapClaims)
	if !ok {
		return nil, errors.New("Dados inválidos")
	}

	userID, _ := claims["sub"].(string)
	username, _ := claims["username"].(string)
	role, _ := claims["role"].(string)

	return &Claims{
		UserID:   userID,
		Username: username,
		Role:     role,
	}, nil
}
