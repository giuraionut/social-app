package com.socialapp.api.entities.user;


import com.socialapp.api.security.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean emailExists(User user) {
        return this.userRepository.findByEmail(user.getEmail()).isPresent();
    }

    public boolean usernameExists(User user) {
        return this.userRepository.findByUsername(user.getUsername()).isPresent();
    }

    public void add(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);
        user.setRefreshToken(UUID.randomUUID().toString());
        user.setGrantedAuthorities(Roles.USER.getGrantedAuthorities());
        user.setAvatar("test");
        user.setRegistrationDate(LocalDate.now());
        this.userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("no user found"));

    }

    public User getByRefreshToken(String refreshToken) {
        return this.userRepository.findByRefreshToken(refreshToken).orElse(null);
    }

    public User findById(String userId) {
        return this.userRepository.findById(userId).orElse(null);
    }

    public void updateUser(User user) {
        this.userRepository.save(user);
    }

    public boolean deleteUser(String userId, String password) {
        if (checkPassword(userId, password)) {
            this.userRepository.deleteById(userId);
            return true;
        }
        return false;
    }

    public boolean checkPassword(String userId, String password) {
        User user = getById(userId);
        return this.passwordEncoder.matches(password, user.getPassword());
    }

    public boolean changePassword(String userId, String oldPassword, String newPassword) {
        User user = getById(userId);
        if (checkPassword(userId, oldPassword)) {
            user.setPassword(this.passwordEncoder.encode(newPassword));
            updateUser(user);
            return true;
        }
        return false;
    }

    public User getById(String userId) {
        return this.userRepository.getById(userId);
    }

    public boolean changeEmail(String userId, String email, String password) {
        User user = getById(userId);
        if (checkPassword(userId, password)) {
            user.setEmail(email);
            updateUser(user);
            return true;
        }
        return false;
    }
}
