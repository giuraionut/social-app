import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-recent-posts-item',
  templateUrl: './recent-posts-item.component.html',
  styleUrls: ['./recent-posts-item.component.scss'],
})
export class RecentPostsItemComponent implements OnInit {
  constructor(private postService: PostService) {}
  public posts: Post[] = [];
  ngOnInit(): void {
    this.postService.getRecentPosts(4).subscribe((posts: Array<Post>) => {
      this.posts = posts;
      posts.forEach((post) => {
        if (post && post.id) {
          this.posts.forEach((post) => {
            if (post && post.id) {
              this.postService
                .getCommentsCount(post.id)
                .subscribe((noOfComments) => {
                  console.log(post.id);
                  this.posts.find((p) => p.id == post.id)!.comments =
                    noOfComments;
                });
              this.postService
                .getVotes(post.id)
                .subscribe((noOfVotes) => {
                  this.posts.find((p) => p.id == post.id)!.likes = noOfVotes;
                });
            }
          });
        }
      });
    });
  }
  ngOnChanges(): void {}
}
