package com.socialapp.api.entities.comment;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {

    Optional<List<Comment>> getByPostId(String postId);
}
