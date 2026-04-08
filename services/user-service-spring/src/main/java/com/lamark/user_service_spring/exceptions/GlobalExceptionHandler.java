package com.lamark.user_service_spring.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.lamark.user_service_spring.dto.response.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(UserNotFoundException.class)
        public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {

                ErrorResponse error = new ErrorResponse(
                                HttpStatus.NOT_FOUND.value(),
                                ex.getMessage());

                return ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .body(error);
        }

        @ExceptionHandler(UserForbiddenException.class)
        public ResponseEntity<ErrorResponse> handleUserNotFound(UserForbiddenException ex) {

                ErrorResponse error = new ErrorResponse(
                                HttpStatus.FORBIDDEN.value(),
                                ex.getMessage());

                return ResponseEntity
                                .status(HttpStatus.FORBIDDEN)
                                .body(error);
        }

        @ExceptionHandler(EmailAlreadyExistsException.class)
        public ResponseEntity<ErrorResponse> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {

                ErrorResponse error = new ErrorResponse(
                                HttpStatus.BAD_REQUEST.value(),
                                ex.getMessage());

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(error);
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleGeneric(
                        Exception ex,
                        HttpServletRequest request) {

                ErrorResponse error = new ErrorResponse(
                                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                                request.getRequestURI());

                return ResponseEntity
                                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(error);
        }
}