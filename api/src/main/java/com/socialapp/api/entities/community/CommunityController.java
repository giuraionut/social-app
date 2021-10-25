package com.socialapp.api.entities.community;

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
import java.util.List;

@RestController
@RequestMapping(path = "community")
@AllArgsConstructor
public class CommunityController {

    private final CommunityService communityService;
    private final JwtUtils jwtUtils;
    private final UserService userService;

    @PostMapping()
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> create(@RequestBody Community community, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        response.setMessage("Community created successfully");

        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.findById(userId);
        community.setCreator(user);
        community.addMember(user);
        user.addOwnedCommunity(community);
        Community addedCommunity = this.communityService.add(community);
        response.setPayload(addedCommunity);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "owned")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getOwnedCommunities(HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        List<Community> communities = user.getOwnedCommunities();
        if (!communities.isEmpty()) {
            response.setPayload(communities);
            response.setMessage("Owned communities by user obtained successfully");
        } else {
            response.setMessage("No owned communities found for user");
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{title}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getByTitle(@PathVariable("title") String title, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        Community community = this.communityService.getByTitle(title);

        if (community != null) {
            response.setMessage("Community obtained {by title} successfully");
        } else {
            response.setMessage("No community found with title " + title);
        }
        response.setPayload(community);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping()
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> delete(@RequestBody Community community) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        response.setMessage("Community deleted successfully");
        this.communityService.delete(community);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping(path = "join")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> join(@RequestBody String communityId, HttpServletRequest request)
    {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        response.setMessage("You joined the community successfully");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        Community community = this.communityService.getById(communityId);
        community.addMember(user);
        Community joinedCommunity = this.communityService.add(community);
        response.setPayload(joinedCommunity);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping(path = "leave")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> leave(@RequestBody String communityId, HttpServletRequest request)
    {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        response.setMessage("You left the community successfully");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        Community community = this.communityService.getById(communityId);
        community.removeMember(user);
        Community leftCommunity = this.communityService.add(community);
        response.setPayload(leftCommunity);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "joined")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getJoinedCommunities(HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        List<Community> communities = user.getJoinedCommunities();
        if (!communities.isEmpty()) {
            response.setMessage("Joined communities by user obtained successfully");
        } else {
            response.setMessage("No joined communities found for user");
        }
        response.setPayload(communities);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
