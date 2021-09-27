package com.socialapp.api.user;


import com.socialapp.api.security.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
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
        this.userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s not found", username)));
    }

    public Set<GrantedAuthority> getUserAuthorities(User user) {
        User localUser = this.userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new IllegalStateException("User does not exists"));
        return localUser.getAuthorities();
    }

    public String getUserId(User user) {
        User foundUser = this.userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new IllegalStateException("User does not exists"));
        return foundUser.getId();
    }

    public User getByRefreshToken(String refreshToken) {
        Optional<User> userByRefreshToken = this.userRepository.findByRefreshToken(refreshToken);
        return userByRefreshToken.orElse(null);
    }
}
