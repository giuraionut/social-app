package com.socialapp.api.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import javax.crypto.SecretKey;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@Data
public class HttpReqUtils {

    private HttpServletRequest request;
    private String requesterId;

    @Autowired
    public HttpReqUtils(HttpServletRequest request, SecretKey secretKey) {
        Cookie[] cookies = request.getCookies();

        if (cookies.length == 0) {
            this.requesterId = null;
        }

        String token = Arrays.stream(cookies)
                .filter(cookie -> cookie.getName()
                        .equals("socialAppJwtToken"))
                .findFirst().map(Cookie::getValue).orElse(null);

        if (token == null) {
            this.requesterId = null;
        }

        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
        Claims body = claimsJws.getBody();

        this.requesterId = (String) body.get("userId");
    }
}
