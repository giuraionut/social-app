package com.socialapp.api.entities.votes;

import com.socialapp.api.entities.post.Post;
import com.socialapp.api.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostVoteRepository extends JpaRepository<PostVote, PVKey> {
    boolean existsByValueAndId(boolean value, PVKey id);
    int countByValueAndIdPost(boolean value, Post post);

    List<PostVote> findAllByValueAndIdUser(boolean value, User user);
}
