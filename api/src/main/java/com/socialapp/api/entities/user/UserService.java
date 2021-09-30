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

    public boolean deleteUser(String id, String password) {
        User user = getById(id);

        if (this.passwordEncoder.matches(password, user.getPassword())) {
            this.userRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public User getById(String userId) {
        return this.userRepository.getById(userId);
    }

}
