package com.lamark.user_service_spring.services;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import com.lamark.user_service_spring.dto.filters.UserFilter;
import com.lamark.user_service_spring.dto.request.CreateUserDTO;
import com.lamark.user_service_spring.dto.request.UpdateUserDTO;
import com.lamark.user_service_spring.dto.response.PageResponse;
import com.lamark.user_service_spring.dto.response.UserDTO;
import com.lamark.user_service_spring.exceptions.EmailAlreadyExistsException;
import com.lamark.user_service_spring.exceptions.UserForbiddenException;
import com.lamark.user_service_spring.exceptions.UserNotFoundException;
import com.lamark.user_service_spring.infrastructure.entities.User;
import com.lamark.user_service_spring.infrastructure.enums.UserRole;
import com.lamark.user_service_spring.infrastructure.repositories.UserRepository;
import com.lamark.user_service_spring.specifications.UserSpecification;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public PageResponse<UserDTO> paginatedList(UserFilter filter, Pageable pageable) {

        Page<User> page = userRepository.findAll(
                UserSpecification.filter(filter),
                pageable);

        List<UserDTO> users = page.getContent()
                .stream()
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getCreatedAt()))
                .toList();

        return new PageResponse<>(
                users,
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages());
    }

    public UserDTO findById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDTO(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole().name(),
                        user.getCreatedAt()))
                .orElseThrow(() -> new UserNotFoundException());
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

    public UserDTO updateUser(Long id, UpdateUserDTO data) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException());

        if (data.username() != null) {
            user.setUsername(data.username());
        }

        if (data.email() != null) {
            if (userRepository.existsByEmailAndIdNot(data.email(), id)) {
                throw new EmailAlreadyExistsException();
            }
            
            user.setEmail(data.email());
        }

        userRepository.save(user);

        return new UserDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                user.getCreatedAt());
    }

    public void deleteUser(Long id, String role) {

        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        if (!role.contains("ADMIN")) {
            throw new UserForbiddenException();
        }

        if (user.getRole() == UserRole.ADMIN) {
            throw new UserForbiddenException(
                    "ADMIN não pode excluir outro ADMIN");
        }

        userRepository.delete(user);
    }

}
