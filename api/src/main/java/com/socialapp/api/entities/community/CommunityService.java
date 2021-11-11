package com.socialapp.api.entities.community;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public Community getById(String communityId) {
        return this.communityRepository.getById(communityId);
    }

    public void delete(Community community) {
        this.communityRepository.delete(community);
    }

    public Community getByTitle(String title) {
        return this.communityRepository.getByTitle(title).orElse(null);
    }

    public List<Community> getAll()
    {
        return this.communityRepository.findAll();
    }

    public void deleteById(String communityId)
    {
        this.communityRepository.deleteById(communityId);
    }

    public void deleteByTitle(String title)
    {
        this.communityRepository.deleteByTitle(title);
    }
}
