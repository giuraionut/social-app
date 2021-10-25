package com.socialapp.api.jwt;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserAuthenticationRequest {
    private String username;
    private String password;
}
