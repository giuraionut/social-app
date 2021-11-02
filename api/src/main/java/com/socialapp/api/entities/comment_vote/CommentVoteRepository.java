package com.socialapp.api.entities.comment_vote;

import com.socialapp.api.entities.comment.Comment;
import com.socialapp.api.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentVoteRepository extends JpaRepository<CommentVote, CVKey> {
    boolean existsByValueAndId(boolean value, CVKey id);

    int countByValueAndIdComment(boolean value, Comment comment);

    List<CommentVote> findAllByValueAndIdUser(boolean value, User user);

    void deleteAllByIdComment(Comment comment);

}
