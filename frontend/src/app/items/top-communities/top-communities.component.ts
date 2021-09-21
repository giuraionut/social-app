import { Component, OnInit } from '@angular/core';
import { Community } from '../../models/community.model';

@Component({
  selector: 'app-top-communities',
  templateUrl: './top-communities.component.html',
  styleUrls: ['./top-communities.component.scss'],
})
export class TopCommunitiesComponent implements OnInit {
  constructor() {}

  public communities: Community[] = [];

  ngOnInit(): void {
    let community: Community = {
      noOfMembers: 3432423,
      authorId: '52341',
      id: '3c2x3',
      name: 'Jokes',
    };
    this.communities.push(community);
    this.communities.push(community);
    this.communities.push(community);
    this.communities.push(community);
    this.communities.push(community);
  }
}
