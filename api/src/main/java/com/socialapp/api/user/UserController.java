package com.socialapp.api.user;

import com.socialapp.api.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;


@RestController
@RequestMapping(path = "")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

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

}
