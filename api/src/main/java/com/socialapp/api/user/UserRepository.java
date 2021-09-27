package com.socialapp.api.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository
        extends JpaRepository<User, String> {
    @Query("SELECT user FROM User user WHERE user.email = ?1")
    Optional<User> findByEmail(String email);

    @Query("SELECT user FROM User user WHERE user.username = ?1")
    Optional<User> findByUsername(String username);

    @Query("SELECT user from User user WHERE user.refreshToken = ?1")
    Optional<User> findByRefreshToken(String refreshToken);
}
