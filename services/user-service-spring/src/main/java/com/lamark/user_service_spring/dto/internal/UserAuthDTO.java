package com.lamark.user_service_spring.dto.internal;

public record UserAuthDTO(
        Long id,
        String email,
        String passwordHash,
        String role) {
}
