import { Component, Input, OnInit } from '@angular/core';
import { Community } from '../../models/community.model';
import { CommunityService } from '../../services/community.service';
@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.scss'],
})
export class CommunityDetailsComponent implements OnInit {
  constructor(private communityService: CommunityService) {}
  @Input() community: Community = {};

  joined: boolean = false;
  ngOnInit(): void {
    this.isJoined();
  }

  joinCommunity() {
    this.communityService.join(this.community.id!).subscribe();
  }
  leaveCommunity() {
    this.communityService.leave(this.community.id!).subscribe();
  }

  public isJoined(): void {
    this.communityService.getJoinedCommunities().subscribe((communities) => {
      if (communities.filter((c) => JSON.stringify(c) === JSON.stringify(this.community)).length > 0) {
        this.joined = true;
      } else {
        this.joined = false;
      }
    });
  }
}
