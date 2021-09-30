import { Component, OnInit } from '@angular/core';
import { Community } from '../../models/community.model';
@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.scss'],
})
export class CommunityDetailsComponent implements OnInit {
  constructor() {}
  public community: Community = {
    title: 'Jokes',
    creationDate: new Date('2021 08 20'),
    description:
      'Bla bla bla this is a very nice community here on this very nice site',
  };
  ngOnInit(): void {}
}
