package com.socialapp.api;

import com.socialapp.api.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping(path = "test")
@AllArgsConstructor
public class Testing {


    @GetMapping(path = "param")
    public ResponseEntity<Object> test(@RequestParam Map<String, String> parameters) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        System.out.println(parameters.get("A"));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
