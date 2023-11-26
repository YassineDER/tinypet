package com.example.echo.exceptions;

public class CannotValidateTokenException extends RuntimeException{
    public CannotValidateTokenException(String message) {
        super(message);
    }
}
