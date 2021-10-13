package com.socialapp.api.entities.post;

import com.socialapp.api.entities.community.Community;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
        return this.postRepository.getByCommunity(community).orElse(null);
    }

    public Post getById(String postId) {
        return this.postRepository.getById(postId);
    }

    public void update(Post post)
    {
        this.postRepository.save(post);
    }
}
