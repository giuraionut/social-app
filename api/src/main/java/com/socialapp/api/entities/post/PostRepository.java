package com.socialapp.api.entities.post;

import com.socialapp.api.entities.community.Community;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<Post, String> {

    Optional<List<Post>> getByCommunity(Community community);
}
