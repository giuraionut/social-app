package com.socialapp.api.entities.comment;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment add(Comment comment) {
        return this.commentRepository.save(comment);
    }

    public List<Comment> getByPostId(String postId) {
        return this.commentRepository.getByPostId(postId).orElse(null);
    }

    public Comment getById(String commentId) {
        return this.commentRepository.getById(commentId);
    }

    public void delete(String commentId) {
        Comment comment = getById(commentId);
        comment.setContent("[deleted]");
        comment.setDeleted(true);
        add(comment);
    }
}
