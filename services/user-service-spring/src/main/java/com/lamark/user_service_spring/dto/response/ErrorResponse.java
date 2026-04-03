package com.lamark.user_service_spring.dto.response;

public record ErrorResponse(
        int status,
        String message) {
}
