package com.example.echo.exceptions;

public class CannotEditCommentException extends IllegalArgumentException{
    public CannotEditCommentException(String errorMessage) {
        super(errorMessage);
    }
}
