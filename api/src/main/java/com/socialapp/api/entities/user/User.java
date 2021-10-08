package com.socialapp.api.entities.user;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.google.common.base.Joiner;
import com.socialapp.api.entities.community.Community;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User implements UserDetails {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;

    private String username;
    private String password;
    private LocalDate dateOfBirth;
    private LocalDate registrationDate;
    private String email;
    private String avatar;
    private String grantedAuthorities;
    private String refreshToken;

    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;

    //Owned communities ( communities that a user created )
    //------------------------------------------------------------------------------------------------------------------
    @OneToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, mappedBy = "creator", fetch = FetchType.LAZY)
    private List<Community> ownedCommunities = new ArrayList<>();

    public void addOwnedCommunity(Community community) {
        ownedCommunities.add(community);
        community.setCreator(this);
    }

    public void deleteOwnedCommunity(Community community) {
        ownedCommunities.remove(community);
        community.setCreator(null);
    }

    @PreRemove
    private void preRemove() {
        ownedCommunities.forEach(ownedCommunity -> ownedCommunity.setCreator(null));
    }

    @JsonManagedReference
    public List<Community> getOwnedCommunities() {
        return ownedCommunities;
    }
    //------------------------------------------------------------------------------------------------------------------

    //Joined Communities
    //------------------------------------------------------------------------------------------------------------------
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "joined_communities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "community_id"),
            indexes = {
                    @Index(name = "user_id_community_id_index", columnList = "user_id, community_id", unique = true)
            })
    private List<Community> joinedCommunities = new ArrayList<>();

    public void addJoinedCommunity(Community community) {
        joinedCommunities.add(community);
    }

    public void removeJoinedCommunity(Community community) {
        joinedCommunities.remove(community);
    }

    public List<Community> getJoinedCommunities() {
        return joinedCommunities;
    }

    //------------------------------------------------------------------------------------------------------------------

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