package com.socialapp.api.entities.post;

import com.socialapp.api.entities.community.Community;
import com.socialapp.api.entities.community.CommunityService;
import com.socialapp.api.entities.post_vote.PVKey;
import com.socialapp.api.entities.post_vote.PostVote;
import com.socialapp.api.entities.post_vote.PostVoteService;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "post")
@AllArgsConstructor
public class PostController {

    private final CommunityService communityService;
    private final JwtUtils jwtUtils;
    private final UserService userService;
    private final PostService postService;
    private final PostVoteService postVoteService;

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
        if (addedPost != null) {
            response.setMessage("Post created successfully");
            response.setPayload(addedPost);
        } else {
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
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        List<Post> allPosts = this.postService.getByCommunity(community);
        List<Post> visibleForUser = allPosts.stream().filter(p -> !p.isHiddenForUser(user)).collect(Collectors.toList());

        if (visibleForUser.isEmpty()) {
            response.setMessage(communityTitle + " has no posts yet");
        } else {
            response.setMessage("Posts from " + communityTitle + " obtained successfully");
            response.setPayload(visibleForUser);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "owned/{deleted}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getOwnedPosts(HttpServletRequest request, @PathVariable("deleted") boolean deleted) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        List<Post> posts;
        if (deleted) {
            posts = user.getOwnedPosts().stream().filter(Post::isDeleted).collect(Collectors.toList());
        } else
            posts = user.getOwnedPosts().stream().filter(p -> !p.isDeleted()).collect(Collectors.toList());
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

        List<Post> allPosts = new ArrayList<>();
        joinedCommunities.forEach(community -> allPosts.addAll(community.getPosts()));
        List<Post> visibleForUser = allPosts.stream().filter(p -> !p.isHiddenForUser(user)).collect(Collectors.toList());
        if (!visibleForUser.isEmpty()) {
            response.setPayload(visibleForUser);
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

    @PostMapping(path = "{postId}/vote/{value}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> votePost(HttpServletRequest request, @PathVariable("postId") String postId, @PathVariable("value") boolean value) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        Post post = this.postService.getById(postId);

        PostVote postVote = new PostVote();
        postVote.setId(new PVKey(user, post));
        postVote.setValue(value);
        boolean voted = this.postVoteService.vote(postVote);
        if (voted) {
            response.setMessage("added");
        } else {
            response.setMessage("removed");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{postId}/votes/{value}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getVotes(HttpServletRequest request, @PathVariable("postId") String postId, @PathVariable("value") boolean value) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        Post post = this.postService.getById(postId);
        int votes = this.postVoteService.countVotes(post);
        response.setPayload(votes);
        response.setMessage("Votes obtained successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping(path = "voted/all")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getVotedPosts(HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        List<Post> posts = this.postVoteService.votedPosts(true, user);

        response.setPayload(posts);
        response.setError("none");
        response.setMessage("Voted posts obtained successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{postId}/comments/count")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getCommentsCount(HttpServletRequest request, @PathVariable("postId") String postId) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        Post post = this.postService.getById(postId);
        int comments = post.getComments().size();
        response.setPayload(comments);
        response.setMessage("Number of comments obtained successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @DeleteMapping(path = "{postId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> deletePost(@PathVariable("postId") String postId, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        Post post = this.postService.getById(postId);
        if (post.getOp().equals(user)) {
            this.postService.delete(postId);
            response.setMessage("Post deleted successfully");
        } else {
            response.setMessage("Something went wrong");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "hide/{postId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> hidePost(@PathVariable("postId") String postId, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        Post post = this.postService.getById(postId);
        this.postService.hidePost(post, user);
        response.setMessage("Post hidden successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "unHide/{postId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> unHidePost(@PathVariable("postId") String postId, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        Post post = this.postService.getById(postId);
        this.postService.unHidePost(post, user);
        response.setMessage("Post unhidden successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "hidden")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getHiddenPosts(HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        final List<Post> hiddenPosts = user.getHiddenPosts();
        if (hiddenPosts.isEmpty()) {
            response.setMessage("User has no hidden posts yet");
            return new ResponseEntity<>(response, HttpStatus.OK);

        }
        response.setPayload(hiddenPosts);
        response.setMessage("Hidden posts obtained successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
