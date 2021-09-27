package com.socialapp.api.user;

import com.google.common.base.Joiner;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
@Data
public class User implements UserDetails {


    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;
    private String username;
    private String password;
    private LocalDate dateOfBirth;
    private String email;
    private String avatar;

    private String grantedAuthorities;

    private String refreshToken;
    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    @Override
    public Set<GrantedAuthority> getAuthorities() {
        String[] grantedAuthoritiesArray = grantedAuthorities.split(",");

        Set<GrantedAuthority> grantedAuthoritiesSet = new HashSet<>();
        for (String g : grantedAuthoritiesArray) {
            grantedAuthoritiesSet.add(new SimpleGrantedAuthority(g));
        }
        return grantedAuthoritiesSet;
    }


    public void setGrantedAuthorities(Set<GrantedAuthority> grantedAuthoritiesSet) {
        this.grantedAuthorities = Joiner.on(",").join(grantedAuthoritiesSet);
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }
}