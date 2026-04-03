package com.lamark.user_service_spring.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateUserDTO(

        @Size(min = 3, max = 30)
        String username,

        @Email
        @Size(max = 120)
        String email

) {}