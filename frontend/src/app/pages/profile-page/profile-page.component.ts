import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { Community } from '../../models/community.model';
import { CommunityService } from '../../services/community.service';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { UserInfoTokenDecoder } from '../../services/userInfoTokenDecoder.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private communityService: CommunityService,
    private postService: PostService,
    private commentService: CommentService,
    private userInfoService: UserInfoTokenDecoder
  ) {}

  public posts: Post[] = [];
  public comments: Comment[] = [];
  public page: string =
    localStorage.getItem('p_page')! !== null
      ? localStorage.getItem('p_page')!
      : 'posts';

  public ownedCommunities: Array<Community> = [];
  public ownedPosts: Array<Post> = [];
  public ownedComments: Array<Comment> = [];
  public hiddenPosts: Array<Post> = [];
  public votedPosts: Array<Post> = [];
  ngOnInit(): void {
    this.changeCategory(this.page);
  }

  public changeCategory(page: string) {
    if (page === 'communities') {
      this.communityService
        .getOwned(this.userInfoService.getUserInfoFromToken().username!).subscribe((communities: Array<Community>) => {
          this.ownedCommunities = communities;
        });
    }
    if (page === 'posts') {
      this.postService.getOwned(this.userInfoService.getUserInfoFromToken().username!).subscribe((posts: Array<Post>) => {
        this.ownedPosts = posts;
      });
    }
    if (page === 'hidden-posts') {
      this.postService.getHidden().subscribe((posts: Array<Post>) => {
        this.hiddenPosts = posts;
      });
    }
    if (page === 'comments') {
      this.commentService.getOwned(this.userInfoService.getUserInfoFromToken().username!).subscribe((comments: Array<Comment>) => {
        this.ownedComments = comments;
      });
    }
    if (page === 'up-voted-posts') {
      this.postService.getVotedPosts(this.userInfoService.getUserInfoFromToken().username!).subscribe((posts: Array<Post>) => {
        this.votedPosts = posts;
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
}
