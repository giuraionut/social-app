import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-comment-item',
  templateUrl: './create-comment-item.component.html',
  styleUrls: ['./create-comment-item.component.scss'],
})
export class CreateCommentItemComponent implements OnInit {
  constructor(
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  createComment(content: string) {
    let comment: Comment = {};
    comment.content = content;
    comment.creationDate = new Date();

    this.route.params.subscribe((params) => {
      this.commentService.create(comment, params['postId']).subscribe();
    });
  }
}
