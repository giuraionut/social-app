import { Component, OnInit } from '@angular/core';
import { Community } from '../../models/community.model';
@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

  constructor() { }

  public community: Community = {};
  ngOnInit(): void {
  }

}
