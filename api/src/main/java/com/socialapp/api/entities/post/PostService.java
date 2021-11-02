package com.socialapp.api.entities.post;

import com.socialapp.api.entities.community.Community;
import com.socialapp.api.entities.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post add(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getByCommunity(Community community)
    {
        return this.postRepository.getByCommunityAndDeleted(community, false).orElse(null);
    }

    public Post getById(String postId) {
        return this.postRepository.getById(postId);
    }

    public void delete(String postId) {
        Post post = getById(postId);
        post.setContent("[deleted]");
        post.setTitle("[deleted]");
        post.setDeleted(true);
        add(post);
    }

    public void hidePost(Post post, User user)
    {
        post.addHiddenByUsers(user);
        add(post);
    }

    public void unHidePost(Post post, User user)
    {
        post.removeHiddenByUser(user);
        user.removeHiddenPost(post);
        add(post);
    }



}
