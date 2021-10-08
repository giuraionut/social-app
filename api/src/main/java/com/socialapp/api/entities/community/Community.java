package com.socialapp.api.entities.community;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.socialapp.api.entities.user.User;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "communities", indexes = {@Index(name = "title_index", columnList = "title", unique = true)})
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
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


    @ManyToMany(mappedBy = "joinedCommunities", fetch = FetchType.LAZY)
    private List<User> members;

    @JsonIgnore
    public List<User> getMembers() {
        return members;
    }

    public void addMember(User member) {
        this.members.add(member);
        member.addJoinedCommunity(this);
    }
    public void removeMember(User member)
    {
        this.members.remove(member);
        member.removeJoinedCommunity(this);
    }
    //------------------------------------------------------------------------------------------------------------------
}
