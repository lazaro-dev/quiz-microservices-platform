package com.lamark.user_service_spring.dto.filters;

import java.time.LocalDateTime;

import com.lamark.user_service_spring.infrastructure.enums.UserRole;

public record UserFilter(
        Long id,
        String username,
        String email,
        UserRole role,
        LocalDateTime createdAfter,
        LocalDateTime createdBefore
) {}