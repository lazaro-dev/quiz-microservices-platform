package com.lamark.user_service_spring.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lamark.user_service_spring.dto.internal.UserAuthDTO;
import com.lamark.user_service_spring.dto.request.CreateUserDTO;
import com.lamark.user_service_spring.dto.response.UserDTO;
import com.lamark.user_service_spring.exceptions.EmailAlreadyExistsException;
import com.lamark.user_service_spring.exceptions.UserNotFoundException;
import com.lamark.user_service_spring.infrastructure.entities.User;
import com.lamark.user_service_spring.infrastructure.enums.UserRole;
import com.lamark.user_service_spring.infrastructure.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InternalUserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDTO findById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getCreatedAt()))
                .orElseThrow(UserNotFoundException::new);
    }

    public UserAuthDTO findAuthUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(UserNotFoundException::new);

        return new UserAuthDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getRole().name());
    }

    
    public UserDTO createUser(CreateUserDTO data) {

        if (userRepository.existsByEmail(data.email())) {
            throw new EmailAlreadyExistsException();
        }

        User user = new User();
        user.setUsername(data.username());
        user.setEmail(data.email());
        user.setPassword(passwordEncoder.encode(data.password()));
        user.setRole(UserRole.USER);

        userRepository.save(user);

        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getCreatedAt());
    }
}
