package com.lamark.user_service_spring.services;

import org.springframework.stereotype.Service;

import com.lamark.user_service_spring.dto.internal.UserAuthDTO;
import com.lamark.user_service_spring.exceptions.UserNotFoundException;
import com.lamark.user_service_spring.infrastructure.entities.User;
import com.lamark.user_service_spring.infrastructure.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InternalUserService {

    private final UserRepository userRepository;

    public UserAuthDTO findAuthUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        return new UserAuthDTO(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().name());
    }
}
