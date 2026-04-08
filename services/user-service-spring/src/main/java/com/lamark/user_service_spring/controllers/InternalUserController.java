package com.lamark.user_service_spring.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.lamark.user_service_spring.dto.internal.UserAuthDTO;
import com.lamark.user_service_spring.dto.request.CreateUserDTO;
import com.lamark.user_service_spring.dto.response.UserDTO;
import com.lamark.user_service_spring.services.InternalUserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/users")
public class InternalUserController {

    private final InternalUserService userService;

    @GetMapping("/me")
    public UserDTO me(Authentication authentication) {
        String userId = authentication.getName();
        return userService.findById(Long.parseLong(userId));
    }

    @GetMapping("/email/{email}")
    public UserAuthDTO findByEmail(@PathVariable String email) {
        return userService.findAuthUserByEmail(email);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO createUser(@Valid @RequestBody CreateUserDTO data) {
        return userService.createUser(data);
    }
}
