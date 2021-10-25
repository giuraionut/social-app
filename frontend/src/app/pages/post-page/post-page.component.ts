import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Community } from '../../models/community.model';
import { CommentService } from '../../services/comment.service';
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {}
  public post: Post = {};
  public comments: Comment[] = [];
  public community: Community = {};
  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((params) => {
          this.commentService.getByPost(params["postId"]).subscribe(comments => {
            this.comments = comments;
          })
          return this.postService.getById(params['postId']);
        })
      )
      .pipe(
        map((post) => {
          this.post = post;
          this.post.mediaHidden = true;
          if (this.post.community) {
            this.community = this.post.community;
          }
        })
      )
      .subscribe();
  }
}
