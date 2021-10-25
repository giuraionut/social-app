package com.socialapp.api.entities.post;

import com.socialapp.api.entities.community.Community;
import com.socialapp.api.entities.community.CommunityService;
import com.socialapp.api.entities.user.User;
import com.socialapp.api.entities.user.UserService;
import com.socialapp.api.jwt.JwtUtils;
import com.socialapp.api.response.Response;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "post")
@AllArgsConstructor
public class PostController {

    private final CommunityService communityService;
    private final JwtUtils jwtUtils;
    private final UserService userService;
    private final PostService postService;


    @PostMapping(path = "community/{communityTitle}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> create(@RequestBody Post post, @PathVariable("communityTitle") String communityTitle, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        Community community = this.communityService.getByTitle(communityTitle);
        user.addPost(post);
        community.addPost(post);
        Post addedPost = this.postService.add(post);
        if(addedPost != null){
            response.setMessage("Post created successfully");
            response.setPayload(addedPost);
        }
        else
        {
            response.setMessage("Cannot create new post, try again later");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "community/{communityTitle}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getByCommunity(HttpServletRequest request, @PathVariable("communityTitle") String communityTitle) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        Community community = this.communityService.getByTitle(communityTitle);

        List<Post> posts = this.postService.getByCommunity(community);
        if (posts.isEmpty()) {
            response.setMessage(communityTitle + " has no posts yet");
        } else {
            response.setMessage("Posts from " + communityTitle + " obtained successfully");
            response.setPayload(posts);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "owned")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getOwnedPosts(HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        List<Post> posts = user.getOwnedPosts();
        if (!posts.isEmpty()) {
            response.setPayload(posts);
            response.setMessage("Owned posts by user obtained successfully");
        } else {
            response.setMessage("No owned posts found for user");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "feed")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getFeedPosts(HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        List<Community> joinedCommunities = user.getJoinedCommunities();

        List<Post> posts = new ArrayList<>();
        joinedCommunities.forEach(community -> posts.addAll(community.getPosts()));
        if (!posts.isEmpty()) {
            response.setPayload(posts);
            response.setMessage("Feed obtained successfully");
        } else {
            response.setMessage("No feed found for user");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "id/{postId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getById(HttpServletRequest request, @PathVariable("postId") String postId) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        Post post = this.postService.getById(postId);

        if (post != null) {
            response.setPayload(post);
            response.setMessage("Owned posts by user obtained successfully");
        } else {
            response.setMessage("No owned posts found for user");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping(path = "hidden/{value}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> setHidden(HttpServletRequest request, @RequestBody Post post, @PathVariable("value") Boolean value) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        post.setVisible(value);
        this.postService.update(post);

        if (value)
            response.setMessage("Post " + post.getTitle() + " made visible");
        else
            response.setMessage("Post " + post.getTitle() + " hidden");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


}
