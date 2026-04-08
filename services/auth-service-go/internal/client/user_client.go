package client

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"time"

	httpError "auth-service-go/internal/error"
	"auth-service-go/internal/model"
)

type UserClient struct {
	httpClient *http.Client
}

func NewUserClient() *UserClient {
	return &UserClient{
		httpClient: &http.Client{
			Timeout: 5 * time.Second,
		},
	}
}

type CreateUserRequest struct {
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func (c *UserClient) GetByEmail(email string) (*model.UserWithPassword, *httpError.HttpError, error) {

	// encode do email
	encodedEmail := url.PathEscape(email)
	userServiceURL := os.Getenv("USER_SERVICE_URL")

	url := fmt.Sprintf(
		userServiceURL+GetUserByEmailRoute,
		encodedEmail,
	)

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	// chave interna
	req.Header.Set("X-Internal-Key", os.Getenv("INTERNAL_API_KEY"))

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errResp httpError.HttpError
		json.NewDecoder(resp.Body).Decode(&errResp)

		return nil, &errResp, nil
	}

	var user model.UserWithPassword

	err = json.NewDecoder(resp.Body).Decode(&user)
	if err != nil {
		return nil, nil, err
	}

	return &user, nil, nil
}

func (c *UserClient) CreateUser(email, username, password string) (*model.User, error) {
	userServiceURL := os.Getenv("USER_SERVICE_URL")

	url := userServiceURL + CreateUserRoute

	payload := CreateUserRequest{
		Email:    email,
		Username: username,
		Password: password,
	}

	jsonBody, err := json.Marshal(payload)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(
		"POST",
		url,
		bytes.NewBuffer(jsonBody),
	)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Internal-Key", os.Getenv("INTERNAL_API_KEY"))

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {

		var errResp httpError.HttpError
		json.NewDecoder(resp.Body).Decode(&errResp)

		return nil, &errResp
	}

	var user model.User

	err = json.NewDecoder(resp.Body).Decode(&user)
	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (c *UserClient) Me(token string) (*model.User, error) {

	url := os.Getenv("USER_SERVICE_URL") + GetMeRoute

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Internal-Key", os.Getenv("INTERNAL_API_KEY"))
	req.Header.Set("Authorization", "Bearer "+token)

	resp, err := c.httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		var errResp httpError.HttpError
		json.NewDecoder(resp.Body).Decode(&errResp)

		return nil, &errResp
	}

	var user model.User

	err = json.NewDecoder(resp.Body).Decode(&user)

	if err != nil {
		return nil, err
	}

	return &user, nil
}
