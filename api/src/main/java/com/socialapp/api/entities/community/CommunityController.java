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

    private CommunityService communityService;
    private JwtUtils jwtUtils;
    private UserService userService;

    @PostMapping(path = "create")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> create(@RequestBody Community community, HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        response.setMessage("Community create successfully");

        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);
        user.addOwnedCommunity(community);
        Community addedCommunity = this.communityService.add(community);
        response.setPayload(addedCommunity);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping(path = "getByOwner")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<Object> getByOwner(HttpServletRequest request) {
        Response response = new Response();
        response.setTimestamp(LocalDateTime.now());
        response.setStatus(HttpStatus.OK);
        response.setError("none");
        String userId = jwtUtils.decodeToken(request, "jwt", "userId");
        User user = this.userService.getById(userId);

        List<Community> communities = user.getOwnedCommunities();
        if (!communities.isEmpty()) {
            response.setMessage("Communities obtained successfully");
        } else {
            response.setMessage("No communities found for user");
        }
        response.setPayload(communities);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
//
//    @GetMapping(path = "/{title}")
//    @PreAuthorize("hasAuthority('ROLE_USER')")
//    public ResponseEntity<Object> getByTitle(@RequestParam HttpServletRequest request) {
//        Response response = new Response();
//        response.setTimestamp(LocalDateTime.now());
//        response.setStatus(HttpStatus.OK);
//        response.setError("none");
//
//        Community community = this.communityService.getByName()
//
//        if (!communities.isEmpty()) {
//            response.setMessage("Communities obtained successfully");
//        } else {
//            response.setMessage("No communities found for user");
//        }
//        response.setPayload(communities);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }

    @DeleteMapping(path = "delete")
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
}
