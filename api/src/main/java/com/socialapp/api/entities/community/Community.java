package com.socialapp.api.entities.community;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.socialapp.api.entities.user.User;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "communities")
@Data
public class Community {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;

    private String title;
    private String description;
    private LocalDate creationDate;

    //------------------------------------------------------------------------------------------------------------------
    @ManyToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name = "creator_id")
    private User creator;

    @JsonBackReference
    public User getCreator() {
        return creator;
    }
    //------------------------------------------------------------------------------------------------------------------
}
