package com.socialapp.api.entities.user;

import com.socialapp.api.jwt.JwtUtils;
import com.socialapp.api.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;


@RestController
@RequestMapping(path = "user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

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

    @PostMapping(path = "signout")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> logout(HttpServletResponse HttpResponse) {

        Cookie jwtToken = new Cookie("jwt", null);
        jwtToken.setSecure(false);
        jwtToken.setDomain("localhost");
        jwtToken.setPath("/");
        jwtToken.setHttpOnly(true);
        jwtToken.setMaxAge(0);

        Cookie userInfoToken = new Cookie("userInfoToken", null);
        userInfoToken.setSecure(false);
        userInfoToken.setDomain("localhost");
        userInfoToken.setPath("/");
        userInfoToken.setHttpOnly(false);
        userInfoToken.setMaxAge(0);

        HttpResponse.addCookie(jwtToken);
        HttpResponse.addCookie(userInfoToken);

        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        response.setMessage("Signed out successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping(path = "delete")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> delete(HttpServletRequest request, @RequestBody String password) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");

        if (this.userService.deleteUser(userId, password)) {
            response.setError("none");
            response.setMessage("Account deleted successfully");
        } else {
            response.setError("wrong password");
            response.setMessage("Password doesn't match");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "password/change")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> changePassword(HttpServletRequest request, @RequestBody Map<String, String> body) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        if (this.userService.changePassword(userId, body.get("oldPassword"), body.get("newPassword"))) {
            response.setError("none");
            response.setMessage("Password changed successfully");
        } else {
            response.setError("wrong password");
            response.setMessage("Passwords don't match");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "email/change")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> changeEmail(HttpServletRequest request, @RequestBody Map<String, String> body) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        if (this.userService.changeEmail(userId, body.get("email"), body.get("password"))) {
            response.setError("none");
            response.setMessage("Email changed successfully");
        } else {
            response.setError("wrong password");
            response.setMessage("Passwords don't match");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "jwt/refresh")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> refreshJWT(HttpServletRequest request, HttpServletResponse httpResponse) throws IOException {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        String newJWT = jwtUtils.refreshJWT(user);

        Cookie newJwtToken = new Cookie("jwt", newJWT);
        newJwtToken.setSecure(false);
        newJwtToken.setDomain("localhost");
        newJwtToken.setPath("/");
        newJwtToken.setHttpOnly(true);
        newJwtToken.setMaxAge(86400);
        httpResponse.addCookie(newJwtToken);

        response.setError("none");
        response.setMessage("JWT refreshed successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "info/token/refresh")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> refreshUserInfoToken(HttpServletRequest request, HttpServletResponse httpResponse) throws IOException {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        String newUserInfoToken = jwtUtils.refreshUserInfoToken(user);

        Cookie userInfoToken = new Cookie("userInfoToken", newUserInfoToken);
        userInfoToken.setSecure(false);
        userInfoToken.setDomain("localhost");
        userInfoToken.setPath("/");
        userInfoToken.setHttpOnly(false);
        userInfoToken.setMaxAge(86400);
        httpResponse.addCookie(userInfoToken);

        response.setError("none");
        response.setMessage("User info token refreshed successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}