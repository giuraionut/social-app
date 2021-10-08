import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Community } from '../../models/community.model';
import { CommunityService } from '../../services/community.service';
@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss']
})
export class CommunityPageComponent implements OnInit {

  constructor(private communityService: CommunityService, private route: ActivatedRoute) { }

  public community: Community = {};
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getCommunityByTitle(params['title']);
    });
  }

  public getCommunityByTitle(title: string)
  {
     this.communityService.getByTitle(title).subscribe(community => {
       this.community = community;
     });
  }

}
