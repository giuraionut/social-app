package com.socialapp.api.response;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
public class Response {
    private LocalDateTime timestamp;
    private HttpStatus status;
    private String message;
    private String error;
    private Object payload;
}