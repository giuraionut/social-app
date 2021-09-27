package com.socialapp.api.jwt;

import lombok.Data;

@Data
public class UserAuthenticationRequest {
    private String username;
    private String password;
}
