package com.lamark.user_service_spring.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserDTO(

        @NotBlank
        @Size(min = 3, max = 30)
        @Pattern(regexp = "^[a-zA-Z0-9_]+$")
        String username,

        @Email
        @NotBlank
        @Size(max = 120)
        String email,

        @NotBlank
        @Size(min = 6, max = 72)
        String password
) {}