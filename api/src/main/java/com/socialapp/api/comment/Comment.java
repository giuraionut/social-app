package com.socialapp.api.comment;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table
@Data
public class Comment {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    private String content;
    private String authorId;
    private String parentId;
    private String postId;
    private LocalDate creationDate;
    private Integer likes;
    private Integer dislikes;

    //many-to-one childsId
}
