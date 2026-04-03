package com.lamark.user_service_spring.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lamark.user_service_spring.dto.internal.UserAuthDTO;
import com.lamark.user_service_spring.services.InternalUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/internal/users")
public class InternalUserController {

    private final InternalUserService userService;

    @GetMapping("/email/{email}")
    public UserAuthDTO  findByEmail(@PathVariable String email) {
        return userService.findAuthUserByEmail(email);
    }
}
