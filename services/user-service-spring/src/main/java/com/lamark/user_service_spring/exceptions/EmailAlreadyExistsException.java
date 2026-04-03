package com.lamark.user_service_spring.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class EmailAlreadyExistsException extends RuntimeException {

    public EmailAlreadyExistsException() {
        super("E-mail já cadastrado!");
    }

    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
