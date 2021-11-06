package com.socialapp.api.entities.post;

import com.socialapp.api.entities.community.Community;
import com.socialapp.api.entities.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
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
            PostMedia postMedia = new PostMedia();
            if (mediaDirectory.mkdirs()) {
                return savedPost;
            }
            try {
                byte[] mediaBytes = media.getBytes();
                String postId = savedPost.getId();
                final String mimeType = media.getContentType();
                if (mimeType != null) {
                    final String[] mimeTypeArray = mimeType.split("/");
                    final String extension = mimeTypeArray[1];
                    final String fileName = postId + "_media." + extension;
                    Path path = Paths.get(mediaDirectory.getPath() + "\\" + fileName);
                    Files.write(path, mediaBytes);
                    postMedia.setName(media.getOriginalFilename());
                    postMedia.setType(mimeTypeArray[0]);
                    postMedia.setUrl(fileName);
                    postMedia.setExternal(false);
                    post.setPostMedia(postMedia);
                } else {
                    throw new IllegalArgumentException();
                }
            } catch (IOException ex) {
                System.out.println("Exception: " + ex);
            }
        } else {
            PostMedia postMedia = post.getPostMedia();
            final String urlString = postMedia.getUrl();
            try {
                URL url = new URL(urlString);
                File file = new File(url.getFile());
                final String name = file.getName();
                final String mimeType = Files.probeContentType(file.toPath());
                final String[] mimeTypeArray = mimeType.split("/");
                postMedia.setName(name);
                postMedia.setType(mimeTypeArray[0]);
                postMedia.setUrl(urlString);
                postMedia.setExternal(true);
            } catch (MalformedURLException ex) {
                System.out.println("Exception: " + ex);

            } catch (IOException exception) {
                exception.printStackTrace();
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
