package com.lamark.user_service_spring.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lamark.user_service_spring.dto.request.CreateUserDTO;
import com.lamark.user_service_spring.dto.request.UpdateUserDTO;
import com.lamark.user_service_spring.dto.response.UserDTO;
import com.lamark.user_service_spring.exceptions.EmailAlreadyExistsException;
import com.lamark.user_service_spring.exceptions.UserForbiddenException;
import com.lamark.user_service_spring.exceptions.UserNotFoundException;
import com.lamark.user_service_spring.infrastructure.entities.User;
import com.lamark.user_service_spring.infrastructure.enums.UserRole;
import com.lamark.user_service_spring.infrastructure.repositories.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Test
    @DisplayName("Deve criar um novo usuário com sucesso")
    void createUserCase1() {
        CreateUserDTO requestBody = new CreateUserDTO("Paulo", "paula@gmail", "password");

        when(passwordEncoder.encode(any()))
                .thenReturn("hashedPassword");

        when(userRepository.save(any(User.class)))
                .thenAnswer(invocation -> {
                    User user = invocation.getArgument(0);
                    user.setId(1L);
                    return user;
                });

        UserDTO result = userService.createUser(requestBody);

        assertNotNull(result);
        assertEquals(1L, result.id());
        assertEquals("Paulo", result.username());

    }

    @Test
    @DisplayName("Deve falhar ao criar um novo usuário com email duplicado")
    void createUserCase2() {
        when(userRepository.existsByEmail("paula@gmail"))
                .thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class,
                () -> userService.createUser(new CreateUserDTO("Paulo", "paula@gmail", "password")));
    }

    @Test
    @DisplayName("Deve atualizar usuário")
    void updateUserCase1() {

        User user = new User();
        user.setId(1L);
        user.setUsername("antonio");
        user.setRole(UserRole.USER);

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        UpdateUserDTO dto = new UpdateUserDTO("antonio_andrade", null);

        UserDTO result = userService.updateUser(1L, dto);

        assertEquals("antonio_andrade", result.username());
    }

    @Test
    @DisplayName("Deve falhar ao atualizar usuário com email duplicado")
    void updateUserCase2() {

        User user = new User();
        user.setId(1L);
        user.setUsername("antonio");
        user.setEmail("antonio@gmail.com");
        user.setRole(UserRole.USER);

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        when(userRepository.existsByEmailAndIdNot("paula@gmail", 1L))
                .thenReturn(true);

        assertThrows(EmailAlreadyExistsException.class,
                () -> userService.updateUser(1L, new UpdateUserDTO("Paulo", "paula@gmail")));
    }

    @Test
    @DisplayName("Deve excluir usuário")
    void deleteUserCase1() {

        User user = new User();
        user.setId(1L);
        user.setRole(UserRole.USER);

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        userService.deleteUser(1L, "ROLE_ADMIN");

        verify(userRepository).delete(user);
    }

    @Test
    @DisplayName("Deve lançar exceção quando tentar excluir admin")
    void deleteUserCase2() {

        User user = new User();
        user.setId(1L);
        user.setUsername("antonio");
        user.setRole(UserRole.ADMIN);

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        assertThrows(
                UserForbiddenException.class,
                () -> userService.deleteUser(1L, "ROLE_ADMIN"));
    }

    @Test
    @DisplayName("Deve lançar exceção quando tentar excluir e não for admin autorizado")
    void deleteUserCase3() {

        User user = new User();
        user.setId(1L);
        user.setUsername("antonio");
        user.setRole(UserRole.USER);

        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));

        assertThrows(
                UserForbiddenException.class,
                () -> userService.deleteUser(1L, "ROLE_USER"));
    }

    @Test
    @DisplayName("Deve lançar exceção quando usuário não existir")
    void findByIdCase1() {

        when(userRepository.findById(1L))
                .thenReturn(Optional.empty());

        assertThrows(
                UserNotFoundException.class,
                () -> userService.findById(1L));
    }
}
