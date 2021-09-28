package com.socialapp.api.user;

import com.socialapp.api.jwt.HttpReqUtils;
import com.socialapp.api.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;


@RestController
@RequestMapping(path = "")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    @Autowired
    private final SecretKey secretKey;
    @Autowired
    private final AuthenticationManager authenticationManager;

    @PostMapping(path = "register")
    public ResponseEntity<Object> register(@RequestBody User newUser) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);

        if (this.userService.emailExists(newUser) || this.userService.usernameExists(newUser)) {
            response.setMessage("Email or username already exists");
            response.setError("duplicate found");
        } else {
            response.setMessage("Registration successfully");
            response.setError("none");
            this.userService.add(newUser);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "user/authenticated")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getAuthenticatedUser(HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);

        HttpReqUtils requestValidator = new HttpReqUtils(request, secretKey);
        User authenticatedUser = this.userService.getById(requestValidator.getRequesterId());

        if (authenticatedUser != null) {
            response.setError("none");
            response.setMessage("Authenticated user information obtained successfully!");
            response.setPayload(authenticatedUser);

        } else {
            response.setError("not found");
            response.setMessage("Authenticated user not found");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping(path = "signout")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> logout(HttpServletResponse HttpResponse) {

        Cookie jwtToken = new Cookie("socialAppJwtToken", null);
        jwtToken.setSecure(false);
        jwtToken.setDomain("localhost");
        jwtToken.setPath("/");
        jwtToken.setHttpOnly(true);
        jwtToken.setMaxAge(0);

        Cookie userInfo = new Cookie("userInfo", null);
        userInfo.setSecure(false);
        userInfo.setDomain("localhost");
        userInfo.setPath("/");
        userInfo.setHttpOnly(false);
        userInfo.setMaxAge(0);

        HttpResponse.addCookie(jwtToken);
        HttpResponse.addCookie(userInfo);

        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        response.setMessage("Signed out successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
