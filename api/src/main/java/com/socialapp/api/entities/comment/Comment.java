package com.socialapp.api.entities.comment;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.socialapp.api.entities.post.Post;
import com.socialapp.api.entities.user.User;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comments")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Comment {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;

    private String content;

    private Instant creationDate;

    private boolean deleted;
    
    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Comment parent;

    @OneToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, mappedBy = "parent", fetch = FetchType.LAZY)
    private final List<Comment> childs = new ArrayList<>();

    private boolean isParent = false;

    //getters-----------------------------------------------------------------------------------------------------------


    public boolean isDeleted() {
        return deleted;
    }

    public String getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    @JsonIgnore
    public Post getPost() {
        return post;
    }

//    @JsonIgnore
    public User getAuthor() {
        return author;
    }

    @JsonIgnore
    public Comment getParent() {
        return parent;
    }

//    @JsonIgnore
    public List<Comment> getChilds() {
        return childs;
    }

    @JsonProperty(value="isParent")
    public boolean isParent() {
        return isParent;
    }

    //setters-----------------------------------------------------------------------------------------------------------

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public void setParent(Comment parent) {
        this.parent = parent;
    }

    public void setParent(boolean bool) {
        isParent = bool;
    }

    //create----------------------------------------------------------------------------------------------------------------
    public void addChild(Comment child) {
        this.childs.add(child);
        child.setParent(this);
    }

    //remove
    public void removeChild(Comment child){
        this.childs.remove(child);
        child.setParent(null);
    }
}
