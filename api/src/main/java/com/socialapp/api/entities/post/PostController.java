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
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/post")
@AllArgsConstructor
public class PostController {

    private final CommunityService communityService;
    private final JwtUtils jwtUtils;
    private final UserService userService;
    private final PostService postService;
    private final PostVoteService postVoteService;

    @PostMapping(path = "{communityTitle}/add_post")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> create(@RequestPart("post") Post post, @RequestPart("media") MultipartFile media,
                                         @PathVariable("communityTitle") String communityTitle, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        Community community = this.communityService.getByTitle(communityTitle);
        user.addPost(post);
        community.addPost(post);
        try {
            Post addedPost = this.postService.create(post, media);
            if (addedPost != null) {
                response.setMessage("Post created successfully");
                response.setPayload(addedPost);
            } else {
                response.setMessage("Cannot create new post, try again later");
            }
        } catch (Exception ex) {
            response.setMessage("Something went wrong, please try again");
            ex.printStackTrace();
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping(path = "{communityTitle}/all")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getByCommunity(HttpServletRequest request, @RequestParam Map<String, String> parameters, @PathVariable("communityTitle") String communityTitle) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        final int limit = Integer.parseInt(parameters.get("limit"));

        Community community = this.communityService.getByTitle(communityTitle);
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        List<Post> allPosts = this.postService.getByCommunity(community);
        List<Post> visibleForUser = allPosts.stream().filter(p -> !p.isHiddenForUser(user)).collect(Collectors.toList()).stream().limit(limit).collect(Collectors.toList());

        if (visibleForUser.isEmpty()) {
            response.setMessage(communityTitle + " has no posts yet");
        } else {
            response.setMessage("Posts from " + communityTitle + " obtained successfully");
            response.setPayload(visibleForUser);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{username}/owned/all")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getOwnedPosts(HttpServletRequest request, @PathVariable("username") String username) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.findByUsername(username);

        List<Post> posts = user.getOwnedPosts().stream().filter(p -> !p.isDeleted()).collect(Collectors.toList());
        if (!posts.isEmpty()) {
            response.setPayload(posts);
            response.setMessage("Owned posts by user obtained successfully");
        } else {
            response.setMessage("No owned posts found for user");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{username}/feed")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getFeedPosts(HttpServletRequest request, @PathVariable("username") String username) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.findByUsername(username);

        List<Community> joinedCommunities = user.getJoinedCommunities();

        List<Post> allPosts = new ArrayList<>();
        joinedCommunities.forEach(community -> allPosts.addAll(community.getPosts()));
        List<Post> visibleForUser = allPosts.stream().filter(p -> !p.isHiddenForUser(user)).filter(p -> !p.isDeleted()).collect(Collectors.toList());
        if (!visibleForUser.isEmpty()) {
            response.setPayload(visibleForUser);
            response.setMessage("Feed obtained successfully");
        } else {
            response.setMessage("No feed found for user");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{postId}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getById(HttpServletRequest request, @PathVariable("postId") String postId) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        Post post = this.postService.getById(postId);

        if (post != null) {
            response.setPayload(post);
            response.setMessage("Post found!");
        } else {
            response.setMessage("No post found");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping(path = "{postId}/vote")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> votePost(HttpServletRequest request, @PathVariable("postId") String postId, @RequestBody Map<String, Boolean> body) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        Post post = this.postService.getById(postId);

        PostVote postVote = new PostVote();
        postVote.setId(new PVKey(user, post));
        postVote.setValue(body.get("value"));
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

    @GetMapping(path = "{username}/voted")
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

    @PutMapping(path = "{postId}/{username}/visibility")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> hidePost(
            @PathVariable("postId") String postId, @PathVariable("username") String username,
            @RequestBody Map<String, Boolean> body, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.findByUsername(username);
        final Boolean value = body.get("value");
        Post post = this.postService.getById(postId);
        if (!value)
            this.postService.hidePost(post, user);
        else {
            this.postService.unHidePost(post, user);

        }
        response.setMessage("Post hidden successfully");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{username}/hidden")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getHiddenPosts(HttpServletRequest request, @PathVariable("username") String username) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.findByUsername(username);
        final List<Post> hiddenPosts = user.getHiddenPosts();
        if (hiddenPosts.isEmpty()) {
            response.setMessage("User has no hidden posts yet");
            return new ResponseEntity<>(response, HttpStatus.OK);

        }
        response.setPayload(hiddenPosts);
        response.setMessage("Hidden posts obtained successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping(path = "most_recent")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getRecentPosts(@RequestParam Map<String, String> parameters, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        final String limit = parameters.get("limit");

        final int limitNumber = Integer.parseInt(limit);

        final List<Post> allPosts = this.postService.getAll();
        allPosts.sort((o1, o2) -> {
            if (o1.getCreationDate().isAfter(o2.getCreationDate())) {
                return -1;
            }
            if (o1.getCreationDate().isBefore(o2.getCreationDate())) {
                return 1;
            }
            return 0;
        });
        final List<Post> limited = allPosts.stream().limit(limitNumber).collect(Collectors.toList());
        response.setPayload(limited);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
