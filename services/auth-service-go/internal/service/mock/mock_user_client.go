package mock

import (
	httpError "auth-service-go/internal/error"
	"auth-service-go/internal/model"
)

type MockUserClient struct {
	User    *model.UserWithPassword
	ErrResp *httpError.HttpError
	Err     error
}

func (m *MockUserClient) GetByEmail(email string) (*model.UserWithPassword, *httpError.HttpError, error) {
	return m.User, m.ErrResp, m.Err
}

func (m *MockUserClient) CreateUser(email, username, password string) (*model.User, error) {
	return &model.User{
		ID:       1,
		Username: username,
		Email:    email,
		Role:     "USER",
	}, nil
}

func (m *MockUserClient) Me(token string) (*model.User, error) {
	return &model.User{
		ID:       1,
		Username: "lazaro",
		Role:     "USER",
	}, nil
}
