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
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "api/v1/community")
@AllArgsConstructor
public class CommunityController {

    private final CommunityService communityService;
    private final JwtUtils jwtUtils;
    private final UserService userService;

    @PostMapping(path = "create_community")
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

    @GetMapping(path = "{username}/communities")
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

    @GetMapping(path = "{title}/about")
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

    @DeleteMapping(path = "{title}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> delete(@PathVariable("title") String communityTitle) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        response.setMessage("Community deleted successfully");
        this.communityService.deleteByTitle(communityTitle);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping(path = "{title}/{username}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> join(@RequestBody Map<String,String> body, @PathVariable("title") String title, @PathVariable("username") String username, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");

        response.setMessage("You joined the community successfully");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.findByUsername(username);
        Community community = this.communityService.getByTitle(title);

        final String action = body.get("action");
        if(action.equals("join"))
        {
            community.addMember(user);
        }
        if(action.equals("leave"))
        {
            community.removeMember(user);
        }
        Community joinedCommunity = this.communityService.add(community);
        response.setPayload(joinedCommunity);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{title}/{username}")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> checkJoined(HttpServletRequest request, @PathVariable("title") String title) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        List<Community> communities = user.getJoinedCommunities();
        if (!communities.isEmpty()) {
            if (communities.stream().anyMatch(community -> community.getTitle().equals(title))) {
                response.setPayload(true);
                response.setMessage("User is member of this community");
            }
        } else {
            response.setPayload(false);
            response.setMessage("User is not member of this community");
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "{username}/joined")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getJoinedCommunities(HttpServletRequest request, @PathVariable("username") String username) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String requesterId = jwtUtils.decodeToken(request, "jwt", "userId");
        final User user = this.userService.findByUsername(username);
        List<Community> communities = user.getJoinedCommunities();
        if (!communities.isEmpty()) {
            response.setMessage("Joined communities by user obtained successfully");
        } else {
            response.setMessage("No joined communities found for user");
        }
        response.setPayload(communities);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("top")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getTopCommunities(@RequestParam Map<String, String> parameters, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        final int limit = Integer.parseInt(parameters.get("limit"));
        final List<Community> allCommunities = this.communityService.getAll();
        allCommunities.sort(Comparator.comparingInt(o -> o.getMembers().size()));
        final List<Community> limited = allCommunities.stream().limit(limit).collect(Collectors.toList());
        response.setPayload(limited);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}