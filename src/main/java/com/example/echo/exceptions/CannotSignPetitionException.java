package com.example.echo.exceptions;

public class CannotSignPetitionException extends RuntimeException{
    public CannotSignPetitionException(String message) {
        super(message);
    }
}
