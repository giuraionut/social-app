package com.socialapp.api.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.socialapp.api.response.AuthenticationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class UserAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final Gson gson = new Gson();

    public UserAuthenticationFilter(
            AuthenticationManager authenticationManager, JwtUtils jwtUtils) {

        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        try {
            UserAuthenticationRequest authenticationRequest = new ObjectMapper().
                    readValue(request.getInputStream(), UserAuthenticationRequest.class);

            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()
            );
            Authentication authenticate = authenticationManager.authenticate(authentication);
            if (!authenticate.isAuthenticated()) {
                authenticate.setAuthenticated(false);
            }
            return authenticate;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authentication) throws IOException {

        Cookie jwtToken = new Cookie("jwt", jwtUtils.generateJWT(authentication));
        jwtToken.setSecure(false);
        jwtToken.setDomain("localhost");
        jwtToken.setPath("/");
        jwtToken.setHttpOnly(true);
        jwtToken.setMaxAge(86400);

        Cookie userInfo = new Cookie("userInfoToken", jwtUtils.generateUserInfoToken(authentication));
        userInfo.setSecure(false);
        userInfo.setDomain("localhost");
        userInfo.setPath("/");
        userInfo.setHttpOnly(false);
        userInfo.setMaxAge(86400);

        AuthenticationResponse authResponse = new AuthenticationResponse();
        authResponse.setStatus(HttpStatus.OK);
        authResponse.setMessage("Authentication successfully");
        authResponse.setPayload(null);
        authResponse.setError("none");

        String gsonRes = this.gson.toJson(authResponse);
        response.addCookie(jwtToken);
        response.addCookie(userInfo);
        response.getWriter().print(gsonRes);
        response.getWriter().flush();
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        AuthenticationResponse authResponse = new AuthenticationResponse();
        authResponse.setStatus(HttpStatus.BAD_REQUEST);
        authResponse.setMessage("Authentication failed");
        authResponse.setError("wrong credentials");
        String gsonRes = this.gson.toJson(authResponse);
        response.setStatus(200);
        response.getWriter().print(gsonRes);
        response.getWriter().flush();
    }
}
