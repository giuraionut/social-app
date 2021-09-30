package com.socialapp.api.entities.community;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommunityService {

    private final CommunityRepository communityRepository;

    @Autowired
    public CommunityService(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    public Community add(Community community) {
        return this.communityRepository.save(community);
    }

    public Community getById(Community community) {
        return this.communityRepository.getById(community.getId());
    }

    public void delete(Community community) {
        this.communityRepository.delete(community);
    }
}
