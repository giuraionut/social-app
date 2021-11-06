import { Component, OnInit } from '@angular/core';
import { Community } from '../../models/community.model';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-top-communities-item',
  templateUrl: './top-communities-item.component.html',
  styleUrls: ['./top-communities-item.component.scss'],
})
export class TopCommunitiesItemComponent implements OnInit {
  constructor(private communityService: CommunityService) {}

  public communities: Community[] = [];

  ngOnInit(): void {
    this.communityService
      .getTopCommunities(10)
      .subscribe((communities: Array<Community>) => {
        this.communities = communities;
      });
  }
}
