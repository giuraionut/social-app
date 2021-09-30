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
import java.time.LocalDateTime;


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

        Cookie userInfo = new Cookie("userInfoToken", null);
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
}
