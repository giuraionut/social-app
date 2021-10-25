package com.socialapp.api.entities.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.google.common.base.Joiner;
import com.socialapp.api.entities.comment.Comment;
import com.socialapp.api.entities.community.Community;
import com.socialapp.api.entities.post.Post;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User implements UserDetails {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    private String username;
    private String password;
    private Instant dateOfBirth;
    private Instant registrationDate;
    private String email;
    private String avatar;
    private String grantedAuthorities;
    private String refreshToken;
    private boolean isAccountNonExpired = true;
    private boolean isAccountNonLocked = true;
    private boolean isCredentialsNonExpired = true;
    private boolean isEnabled = true;
    @OneToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, mappedBy = "op", fetch = FetchType.LAZY)
    private final List<Post> ownedPosts = new ArrayList<>();
    @OneToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, mappedBy = "creator", fetch = FetchType.LAZY)
    private final List<Community> ownedCommunities = new ArrayList<>();
    @OneToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, mappedBy = "author", fetch = FetchType.LAZY)
    private final List<Comment> ownedComments = new ArrayList<>();
    //ManyToMany for joined communities
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "joined_communities",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "community_id"),
            indexes = {
                    @Index(name = "user_id_community_id_index", columnList = "user_id, community_id", unique = true)
            })
    private List<Community> joinedCommunities = new ArrayList<>();

    //add---------------------------------------------------------------------------------------------------------------
    public void addPost(Post post) {
        ownedPosts.add(post);
        post.setOp(this);
    }

    public void addComment(Comment comment)
    {
        ownedComments.add(comment);
        comment.setAuthor(this);
    }
    public void addJoinedCommunity(Community community) {
        joinedCommunities.add(community);
    }

    public void addOwnedCommunity(Community community) {
        ownedCommunities.add(community);
        community.setCreator(this);
    }

    public void addOwnedPost(Post post) {
        ownedPosts.add(post);
        post.setOp(this);
    }
    //remove------------------------------------------------------------------------------------------------------------
    @PreRemove
    private void preRemove() {
        ownedCommunities.forEach(ownedCommunity -> ownedCommunity.setCreator(null));
        ownedPosts.forEach(ownedPost -> ownedPost.setOp(null));
    }

    public void removeJoinedCommunity(Community community) {
        joinedCommunities.remove(community);
    }

    public void removeOwnedCommunity(Community community) {
        ownedCommunities.remove(community);
        community.setCreator(null);
    }

    //getters-----------------------------------------------------------------------------------------------------------
    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Instant getDateOfBirth() {
        return dateOfBirth;
    }

    public Instant getRegistrationDate() {
        return registrationDate;
    }

    public String getEmail() {
        return email;
    }

    public String getAvatar() {
        return avatar;
    }

    @JsonIgnore
    public String getGrantedAuthorities() {
        return grantedAuthorities;
    }

    @Override
    @JsonIgnore
    public Set<GrantedAuthority> getAuthorities() {
        String[] grantedAuthoritiesArray = grantedAuthorities.split(",");

        Set<GrantedAuthority> grantedAuthoritiesSet = new HashSet<>();
        for (String g : grantedAuthoritiesArray) {
            grantedAuthoritiesSet.add(new SimpleGrantedAuthority(g));
        }
        return grantedAuthoritiesSet;
    }

    @JsonIgnore
    public String getRefreshToken() {
        return refreshToken;
    }

    @JsonIgnore
    public List<Comment> getOwnedComments() {
        return ownedComments;
    }

    @JsonIgnore
    public List<Community> getOwnedCommunities() {
        return ownedCommunities;
    }

    @JsonIgnore
    public List<Post> getOwnedPosts() {
        return ownedPosts;
    }

    @JsonIgnore
    public List<Community> getJoinedCommunities() {
        return joinedCommunities;
    }

    //is----------------------------------------------------------------------------------------------------------------
    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return this.isAccountNonExpired;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return this.isAccountNonLocked;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return this.isCredentialsNonExpired;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return this.isEnabled;
    }

    //setters-----------------------------------------------------------------------------------------------------------
    public void setGrantedAuthorities(Set<GrantedAuthority> grantedAuthoritiesSet) {
        this.grantedAuthorities = Joiner.on(",").join(grantedAuthoritiesSet);
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDateOfBirth(Instant dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setRegistrationDate(Instant registrationDate) {
        this.registrationDate = registrationDate;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public void setGrantedAuthorities(String grantedAuthorities) {
        this.grantedAuthorities = grantedAuthorities;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

}