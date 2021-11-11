import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Community } from '../../models/community.model';
import { Post } from '../../models/post.model';
import { CommunityService } from '../../services/community.service';
import { UserInfoTokenDecoder } from '../../services/userInfoTokenDecoder.service';
@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.scss'],
})
export class CommunityDetailsComponent implements OnInit {
  constructor(
    private communityService: CommunityService,
    public snackBar: MatSnackBar,
    private userInfoService: UserInfoTokenDecoder
  ) {}
  @Input() community: Community = {};

  joined: boolean = false;
  label: string = 'Join';
  ngOnInit(): void {}
  ngOnChanges(): void {
    if (this.community.id) this.isJoined();
  }
  isJoined() {
    this.communityService
      .isJoined(
        this.community,
        this.userInfoService.getUserInfoFromToken().username!
      )
      .subscribe((j) => {
        this.joined = j;
        if (j) {
          this.label = 'Leave';
        } else {
          this.label = 'Join';
        }
      });
  }
  joinCommunity() {
    this.communityService
      .join(
        this.community,
        this.userInfoService.getUserInfoFromToken().username!
      )
      .subscribe(() => {
        this.label = 'Leave';
        this.joined = true;
      });
  }
  leaveCommunity() {
    this.communityService
      .leave(
        this.community,
        this.userInfoService.getUserInfoFromToken().username!
      )
      .subscribe(() => {
        this.label = 'Join';
        this.joined = false;
      });
  }

  public posts: Array<Post> = [];

  action() {
    if (this.joined) {
      this.leaveCommunity();
    } else {
      this.joinCommunity();
    }
  }
}
