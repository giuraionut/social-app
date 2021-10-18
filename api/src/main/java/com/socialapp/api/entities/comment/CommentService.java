package com.socialapp.api.entities.comment;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }


    public Comment add (Comment comment)
    {
        return this.commentRepository.save(comment);
    }

    public List<Comment> getByPostId(String postId) {
        return this.commentRepository.getByPostId(postId).orElse(null);
    }
}
