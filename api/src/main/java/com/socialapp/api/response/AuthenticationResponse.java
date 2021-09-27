package com.socialapp.api.response;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class AuthenticationResponse {
    private HttpStatus status;
    private String message;
    private String error;
    private Object payload;
}
