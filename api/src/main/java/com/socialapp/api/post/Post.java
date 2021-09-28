package com.socialapp.api.post;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table
@Data
public class Post {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    private String authorId;
    private String title;
    private String content;
    private String media;
    private LocalDate creationDate;
    private Integer likes;
    private Integer dislikes;
    private Integer noOfComments;

    //many-to-one commentsId;
}
