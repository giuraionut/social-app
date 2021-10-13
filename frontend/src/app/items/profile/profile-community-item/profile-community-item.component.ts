import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from '../../../models/community.model';
@Component({
  selector: 'app-profile-community-item',
  templateUrl: './profile-community-item.component.html',
  styleUrls: ['./profile-community-item.component.scss']
})
export class ProfileCommunityItemComponent implements OnInit {

  constructor(private router: Router) { }
  @Input() community: Community = {};
  ngOnInit(): void {
  }
  goToCommunity() {
    this.router.navigate([`socialapp/community/${this.community.title}`]);
  }
}
