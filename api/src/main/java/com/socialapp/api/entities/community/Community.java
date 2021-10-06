package com.socialapp.api.entities.community;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.socialapp.api.entities.user.User;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "communities", indexes = {@Index(name = "title_index", columnList = "title", unique = true)})
@Data
public class Community {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    private String id;

    @Column(name = "title", nullable = false)
    private String title;
    private String description;
    private LocalDate creationDate;

    //------------------------------------------------------------------------------------------------------------------
    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @JsonBackReference
    public User getCreator() {
        return creator;
    }
    //------------------------------------------------------------------------------------------------------------------
}
