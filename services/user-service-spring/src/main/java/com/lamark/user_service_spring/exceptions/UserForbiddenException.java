package com.lamark.user_service_spring.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class UserForbiddenException extends RuntimeException {
    public UserForbiddenException() {
        super("Usuário não pode realizar essa operação");
    }

    public UserForbiddenException(String message) {
        super(message);
    }
}
