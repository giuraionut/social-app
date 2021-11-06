package com.socialapp.api.entities.post;

import com.socialapp.api.entities.community.Community;
import com.socialapp.api.entities.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post create(Post post, MultipartFile media) {
        final Post savedPost = postRepository.save(post);
        if (!media.isEmpty()) {
            File mediaDirectory = new File("../storage/post_media");

            if (mediaDirectory.mkdirs()) {
                return savedPost;
            }
            try {
                byte[] mediaBytes = media.getBytes();

                String postId = savedPost.getId();
                final String contentType = media.getContentType();
                if (contentType != null) {

                    final String extension = contentType.split("/")[1];
                    final String fileName = postId + "_media." + extension;
                    Path path = Paths.get(mediaDirectory.getPath() + "\\" + fileName);
                    Files.write(path, mediaBytes);
                    post.setMediaUrl(fileName);
                } else {
                    throw new IllegalArgumentException();
                }

            } catch (IOException ex) {
                System.out.println("Exception: " + ex);
            }
        }
        return update(post);
    }

    public Post update(Post post) {
        return postRepository.save(post);

    }

    public List<Post> getByCommunity(Community community) {
        return this.postRepository.getByCommunityAndDeleted(community, false).orElse(null);
    }

    public Post getById(String postId) {
        return this.postRepository.findById(postId).orElse(null);
    }

    public void delete(String postId) {
        Post post = getById(postId);
        post.setContent("[deleted]");
        post.setTitle("[deleted]");
        post.setDeleted(true);
        update(post);
    }

    public void hidePost(Post post, User user) {
        post.addHiddenByUsers(user);
        update(post);

    }

    public void unHidePost(Post post, User user) {
        post.removeHiddenByUser(user);
        user.removeHiddenPost(post);
        update(post);
    }

    public List<Post> getAll() {
        return this.postRepository.getAllByDeleted(false).orElse(null);
    }
}
