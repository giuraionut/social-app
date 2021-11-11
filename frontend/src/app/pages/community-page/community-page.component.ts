import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Community } from '../../models/community.model';
import { Post } from '../../models/post.model';
import { CommunityService } from '../../services/community.service';
import { PostService } from '../../services/post.service';
import { map, mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-community-page',
  templateUrl: './community-page.component.html',
  styleUrls: ['./community-page.component.scss'],
})
export class CommunityPageComponent implements OnInit {
  constructor(
    private communityService: CommunityService,
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  public community: Community = {};
  public posts: Array<Post> = [];
  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((params) => {
          return this.communityService.getByTitle(params['title']);
        }))
      .pipe(
        mergeMap((community) => {
          this.community = community;
          return this.postService.getByCommunity(community);
        }))
      .subscribe((posts) => (this.posts = posts));
  }
}
