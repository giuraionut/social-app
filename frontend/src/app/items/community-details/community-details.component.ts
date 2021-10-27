import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Community } from '../../models/community.model';
import { Post } from '../../models/post.model';
import { CommunityService } from '../../services/community.service';
@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.scss'],
})
export class CommunityDetailsComponent implements OnInit {
  constructor(
    private communityService: CommunityService,
    public snackBar: MatSnackBar
  ) {}
  @Input() community: Community = {};

  joined: boolean = false;
  label: string = 'Join';
  ngOnInit(): void {
  }
  ngOnChanges(): void {
    if(this.community.id)
    this.isJoined(this.community.id);
  }
  isJoined(communityId: string) {
    this.communityService.isJoined(communityId).subscribe((j) => {
      this.joined = j;
      if(j)
      {
        this.label = "Leave";
      }
      else
      {
        this.label = "Join";
      }
    });
  }
  joinCommunity(communityId: string) {
    this.communityService.join(communityId).subscribe(() => {
      this.label = 'Leave';
      this.joined = true;
    });
  }
  leaveCommunity(communityId: string) {
    this.communityService.leave(communityId).subscribe(() => {
      this.label = 'Join';
      this.joined = false;
    });
  }

  public posts: Array<Post> = [];

  action(communityId: string) {
    if (this.joined) {
      this.leaveCommunity(communityId);
    } else {
      this.joinCommunity(communityId);
    }
  }
}
