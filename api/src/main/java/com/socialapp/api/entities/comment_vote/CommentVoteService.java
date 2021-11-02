package com.socialapp.api.entities.comment_vote;

import com.socialapp.api.entities.comment.Comment;
import com.socialapp.api.entities.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentVoteService {

    private final CommentVoteRepository commentVoteRepository;

    @Autowired
    public CommentVoteService(CommentVoteRepository commentVoteRepository) {
        this.commentVoteRepository = commentVoteRepository;
    }


    public boolean vote(CommentVote vote) {

        if (this.commentVoteRepository.existsByValueAndId(vote.isValue(), vote.getId())) {
            this.commentVoteRepository.delete(vote);
            return false;
        }
        this.commentVoteRepository.save(vote);
        return true;
    }

    public List<Comment> votedComments(boolean value, User user) {

        List<CommentVote> allByValueAndIdUser = this.commentVoteRepository.findAllByValueAndIdUser(value, user);
        return allByValueAndIdUser.stream().map(commentVote -> commentVote.getId().getComment()).collect(Collectors.toList());
    }

    public int countVotes(Comment comment) {
        int positiveVotes = this.commentVoteRepository.countByValueAndIdComment(true, comment);
        int negativeVotes = this.commentVoteRepository.countByValueAndIdComment(false, comment);
        return positiveVotes - negativeVotes;
    }

    @Transactional
    public void deleteAllVotes(Comment comment) {
        this.commentVoteRepository.deleteAllByIdComment(comment);
    }
}
