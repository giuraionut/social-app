import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { Community } from '../../models/community.model';
import { CommunityService } from '../../services/community.service';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private communityService: CommunityService,
    private postService: PostService,
    private commentService: CommentService
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
  public votedPosts: Array<Post> = [];
  ngOnInit(): void {
    this.changeCategory(this.page);

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
    if(page === "comments")
    {
      this.commentService.getOwned().subscribe((comments: Array<Comment>) => {
        this.ownedComments = comments;
      })
    }
    if(page === "up-voted-posts")
    {
      this.postService.getVotedPosts().subscribe((posts: Array<Post>) => {
        this.votedPosts = posts;
        console.log(posts);
      })
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
