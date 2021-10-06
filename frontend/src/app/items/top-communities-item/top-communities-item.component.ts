import { Component, OnInit } from '@angular/core';
import { Community } from '../../models/community.model';

@Component({
  selector: 'app-top-communities-item',
  templateUrl: './top-communities-item.component.html',
  styleUrls: ['./top-communities-item.component.scss'],
})
export class TopCommunitiesItemComponent implements OnInit {
  constructor() {}

  public communities: Community[] = [];

  ngOnInit(): void {
    let community: Community = {
      title: 'Jokes',
      creationDate: new Date('2021 08 20'),
      description:
        'Bla bla bla this is a very nice community here on this very nice site',
    };
    this.communities.push(community);
    this.communities.push(community);
    this.communities.push(community);
    this.communities.push(community);
    this.communities.push(community);
  }
}
