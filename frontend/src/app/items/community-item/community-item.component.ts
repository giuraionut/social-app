import { Component, Input, OnInit } from '@angular/core';
import { Community } from '../../models/community.model';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'app-community-item',
  templateUrl: './community-item.component.html',
  styleUrls: ['./community-item.component.scss'],
})
export class CommunityItemComponent implements OnInit {
  constructor(private communityService: CommunityService) {}

  @Input() community: Community = {};
  @Input() page: string = '';

  ngOnInit(): void {
    console.log(this.community);
  }

  public delete(community: Community) {
    this.communityService.deleteOwnedCommunity(community).subscribe();
  }
}
