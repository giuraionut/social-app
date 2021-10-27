package com.socialapp.api.entities.votes;

import com.socialapp.api.entities.post.Post;
import com.socialapp.api.entities.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostVoteService {
    private final PostVoteRepository postVoteRepository;

    @Autowired
    public PostVoteService(PostVoteRepository postVoteRepository) {
        this.postVoteRepository = postVoteRepository;
    }

    public boolean vote(PostVote vote) {

        if (this.postVoteRepository.existsByValueAndId(vote.isValue(), vote.getId())) {
            this.postVoteRepository.delete(vote);
            return false;
        }
        this.postVoteRepository.save(vote);
        return true;
    }

    public List<Post> votedPosts(boolean value, User user) {

        List<PostVote> allByValueAndIdUser = this.postVoteRepository.findAllByValueAndIdUser(value, user);
        List<Post> posts = allByValueAndIdUser.stream().map(postVote -> postVote.getId().getPost()).collect(Collectors.toList());
        return posts;
    }

    public int countVotes(Post post) {
        int positiveVotes = this.postVoteRepository.countByValueAndIdPost(true, post);
        int negativeVotes = this.postVoteRepository.countByValueAndIdPost(false, post);
        return positiveVotes - negativeVotes;
    }
}
