package com.socialapp.api.jwt;

import com.socialapp.api.entities.user.User;
import com.socialapp.api.entities.user.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.Data;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Date;

@Data
@Configuration
public class JwtUtils {
    private final SecretKey secretKey;
    private final SecretKey userTokenKey;
    private final JwtConfig jwtConfig;
    private final UserService userService;

    public String generateJWT(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(authentication.getName())
                .claim("authorities", authentication.getAuthorities())
                .claim("userId", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
                .signWith(secretKey)
                .compact();
    }

    public String generateUserInfoToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        return Jwts.builder()
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .claim("birthdate", user.getDateOfBirth())
                .claim("avatar", user.getAvatar())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
                .signWith(userTokenKey)
                .compact();
    }

    public String refreshUserInfoToken(User user) {
        return Jwts.builder()
                .claim("username", user.getUsername())
                .claim("email", user.getEmail())
                .claim("birthdate", user.getDateOfBirth())
                .claim("avatar", user.getAvatar())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
                .signWith(userTokenKey)
                .compact();
    }

    public String refreshJWT(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("authorities", user.getAuthorities())
                .claim("userId", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
                .signWith(secretKey)
                .compact();
    }

    public String decodeToken(HttpServletRequest request, String token, String get) {
        Cookie[] cookies = request.getCookies();

        if (cookies.length == 0) {
            return null;
        }

        String decoded_token = Arrays.stream(cookies)
                .filter(cookie -> cookie.getName()
                        .equals(token))
                .findFirst().map(Cookie::getValue).orElse(null);
        Jws<Claims> claimsJws = Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(decoded_token);

        return (String) claimsJws.getBody().get("userId");
    }
}
