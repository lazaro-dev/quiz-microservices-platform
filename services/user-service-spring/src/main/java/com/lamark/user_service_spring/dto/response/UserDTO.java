package com.lamark.user_service_spring.dto.response;

import java.time.LocalDateTime;

public record UserDTO(
        Long id,
        String username,
        String email,
        String role,
        LocalDateTime createdAt
) {}