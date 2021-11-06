package com.socialapp.api.entities.community;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.socialapp.api.entities.post.Post;
import com.socialapp.api.entities.user.User;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "communities", indexes = {@Index(name = "title_index", columnList = "title", unique = true)})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Community {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;
    @Column(name = "title", nullable = false)
    private String title;
    private String description;
    private Instant creationDate;
    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;
    @ManyToMany(mappedBy = "joinedCommunities", fetch = FetchType.LAZY)
    private List<User> members = new ArrayList<>();
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "community", fetch = FetchType.LAZY)
    private List<Post> posts = new ArrayList<>();

    //getters-----------------------------------------------------------------------------------------------------------
    public User getCreator() {
        return creator;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    @JsonIgnore
    public List<Post> getPosts() {
        return posts.stream().filter(p -> !p.isDeleted()).collect(Collectors.toList());
    }

    @JsonIgnore
    public List<User> getMembers() {
        return members;
    }

    //setters-----------------------------------------------------------------------------------------------------------
    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public void setCreator(User creator) {
        this.creator = creator;
    }

    //create---------------------------------------------------------------------------------------------------------------
    public void addMember(User member) {
        this.members.add(member);
        member.addJoinedCommunity(this);
    }

    public void addPost(Post post) {
        posts.add(post);
        post.setCommunity(this);
    }

    //remove------------------------------------------------------------------------------------------------------------
    public void removeMember(User member) {
        member.removeJoinedCommunity(this);
        this.members.remove(member);
    }

    public void removePost(Post post)
    {
        this.posts.remove(post);
        post.setCommunity(null);
    }
}
