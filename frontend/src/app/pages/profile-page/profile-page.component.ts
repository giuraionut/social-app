import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { Community } from '../../models/community.model';
import { CommunityService } from '../../services/community.service';
import { PostService } from '../../services/post.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private communityService: CommunityService,
    private postService: PostService
  ) {}

  public posts: Post[] = [];
  public comments: Comment[] = [];
  public page: string =
    localStorage.getItem('p_page')! !== null
      ? localStorage.getItem('p_page')!
      : 'posts';

  public ownedCommunities: Array<Community> = [];
  public ownedPosts: Array<Post> = [];

  ngOnInit(): void {
    this.changeCategory(this.page);
    this.testData();
  }

  public changeCategory(page: string) {
    if (page === 'communities') {
      this.communityService.getOwned().subscribe((communities: Array<Community>) => {
          this.ownedCommunities = communities;
        });
    }
    if (page === 'posts' || page ==="hidden-posts") {
      this.postService.getOwned().subscribe((posts: Array<Post>) => {
        this.ownedPosts = posts;
      });
    }
  }

  public change(page: string): void {
    localStorage.setItem('p_page', page);
    if (page != this.page) {
      this.changeCategory(page);
      this.page = page;
    }
  }

  public testData() {
    let comment: Comment = {};
    comment.id = '1';
    comment.content = 'blabla';
    comment.likes = 1412;
    comment.dislikes = 120;
    comment.replays = 20;
    comment.parentId = '1';
    comment.authorId = '1';

    let comment2: Comment = {};
    comment2.id = '1';
    comment2.content = 'blabla';
    comment2.likes = 1412;
    comment2.dislikes = 120;
    comment2.replays = 20;
    comment2.parentId = '1';
    comment2.authorId = '1';
    this.comments.push(comment, comment2);
  }
}
