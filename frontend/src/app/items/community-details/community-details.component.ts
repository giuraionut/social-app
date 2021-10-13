import { Component, Input, OnInit } from '@angular/core';
import { Community } from '../../models/community.model';
import { Post } from '../../models/post.model';
import { CommunityService } from '../../services/community.service';
import { PostService } from '../../services/post.service';
@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.scss'],
})
export class CommunityDetailsComponent implements OnInit {
  constructor(private communityService: CommunityService) {}
  @Input() community: Community = {};

  joined: boolean = false;
  label: string = 'Join';
  ngOnInit(): void {
    this.communityService.getJoined().subscribe((communities) => {
      if (
        communities.filter(
          (c) =>
            JSON.stringify(c.title) === JSON.stringify(this.community.title)
        ).length > 0
      ) {
        this.joined = true;
        this.label = "Leave";
      } else {
        this.joined = false;
        this.label = "Join";
      }
    });
  }

  joinCommunity() {
    this.communityService.join(this.community.id!).subscribe();
  }
  leaveCommunity() {
    this.communityService.leave(this.community.id!).subscribe();
  }

  public posts: Array<Post> = [];

  action() {
    if (this.joined) {
      this.communityService.leave(this.community.id!).subscribe();
      this.label = "Join";
    } else {
      this.communityService.join(this.community.id!).subscribe();
      this.label = "Leave";
    }
  }
}
