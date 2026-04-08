package service

import (
	httpError "auth-service-go/internal/error"
	"auth-service-go/internal/model"
	"auth-service-go/internal/security"
)

type UserClient interface {
	GetByEmail(email string) (*model.UserWithPassword, *httpError.HttpError, error)
	CreateUser(email, username, password string) (*model.User, error)
	Me(token string) (*model.User, error)
}

type JWT interface {
	Generate(user *model.UserWithPassword) (string, error)
}

type AuthService struct {
	userClient UserClient
	jwt        JWT
}

func NewAuthService(userClient UserClient, jwt JWT) *AuthService {
	return &AuthService{
		userClient: userClient,
		jwt:        jwt,
	}
}

func (s *AuthService) Login(email, password string) (string, error) {

	user, errResp, err := s.userClient.GetByEmail(email)

	if err != nil {
		return "", err
	}

	if errResp != nil {
		return "", &httpError.HttpError{
			Status:  errResp.Status,
			Message: errResp.Message,
		}
	}

	if !security.CheckPassword(password, user.PasswordHash) {
		return "", &httpError.HttpError{
			Status:  401,
			Message: "Credenciais inválidas",
		}
	}

	return s.jwt.Generate(user)
}

func (s *AuthService) Register(email, username, password string) (string, error) {

	user, err := s.userClient.CreateUser(email, username, password)

	if err != nil {
		return "", err
	}

	return s.jwt.Generate(&model.UserWithPassword{
		ID:       user.ID,
		Username: user.Username,
		Email:    user.Email,
		Role:     user.Role,
	})
}

func (s *AuthService) Me(token string) (*model.User, error) {
	user, err := s.userClient.Me(token)

	if err != nil {
		return nil, err
	}

	return user, nil
}
