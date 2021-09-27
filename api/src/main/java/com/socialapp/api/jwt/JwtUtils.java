package com.socialapp.api.jwt;

import com.socialapp.api.user.User;
import com.socialapp.api.user.UserService;
import io.jsonwebtoken.Jwts;
import lombok.Data;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import java.time.LocalDate;
import java.util.Date;

@Data
@Configuration
public class JwtUtils {
    private final SecretKey secretKey;
    private final JwtConfig jwtConfig;
    private final UserService userService;

    public String generateToken(Authentication authentication) {

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

    public String refreshToken(String refreshToken) {
        User user = this.userService.getByRefreshToken(refreshToken);
        if (user == null) {
            return null;
        }
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("authorities", user.getAuthorities())
                .claim("userId", user.getId())
                .setIssuedAt(new Date())
                .setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(jwtConfig.getTokenExpirationAfterDays())))
                .signWith(secretKey)
                .compact();
    }
}
