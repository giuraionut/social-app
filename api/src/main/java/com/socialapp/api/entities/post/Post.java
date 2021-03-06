package com.socialapp.api.entities.post;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.socialapp.api.entities.comment.Comment;
import com.socialapp.api.entities.community.Community;
import com.socialapp.api.entities.user.User;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "posts")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Post {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;

    private String title;
    private String content;

    private Instant creationDate;

    private boolean deleted = false;
    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;

    @ManyToOne
    @JoinColumn(name = "op_id")
    private User op;

    @OneToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, mappedBy = "post", fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();

    @ManyToMany(mappedBy = "hiddenPosts", fetch = FetchType.LAZY)
    private List<User> hiddenByUsers = new ArrayList<>();

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "post_media_id")
    private PostMedia postMedia;

    public PostMedia getPostMedia() {
        return postMedia;
    }

    public void setPostMedia(PostMedia postMedia) {
        this.postMedia = postMedia;
    }
//getters-----------------------------------------------------------------------------------------------------------

    @JsonIgnore
    public List<User> getHiddenByUsers() {
        return hiddenByUsers;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Community getCommunity() {
        return community;
    }

    public User getOp() {
        return op;
    }

    @JsonIgnore
    public List<Comment> getComments() {
        return comments.stream().filter(c -> !c.isDeleted()).collect(Collectors.toList());
    }

    //is----------------------------------------------------------------------------------------------------------------
    public boolean isDeleted() {
        return deleted;
    }

    public boolean isHiddenForUser(User user)
    {
        return this.hiddenByUsers.contains(user);
    }

    //setters-----------------------------------------------------------------------------------------------------------


    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public void setCommunity(Community community) {
        this.community = community;
    }

    public void setOp(User op) {
        this.op = op;
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    //create---------------------------------------------------------------------------------------------------------------
    public void addComment(Comment comment)
    {
       comments.add(comment);
       comment.setPost(this);
    }

    public void addHiddenByUsers(User user) {
        user.addHiddenPost(this);
    }

    //remove------------------------------------------------------------------------------------------------------------
    public void removeHiddenByUser(User user) {
        user.removeHiddenPost(this);
    }
}
