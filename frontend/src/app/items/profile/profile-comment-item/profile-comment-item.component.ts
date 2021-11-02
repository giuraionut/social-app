import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Comment } from '../../../models/comment.model';
import { CommentService } from '../../../services/comment.service';
@Component({
  selector: 'app-profile-comment-item',
  templateUrl: './profile-comment-item.component.html',
  styleUrls: ['./profile-comment-item.component.scss'],
})
export class ProfileCommentItemComponent implements OnInit {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private commentService: CommentService
  ) {}
  @Input() comment: Comment = {};

  ngOnInit(): void {}

  public delete(): void {
    if (this.comment.id) {
      this.commentService.delete(this.comment.id).subscribe((message) => {
        this.snackBar.open(`${message}`, 'Close', {
          duration: 4000,
        });
      });
    } else {
      this.snackBar.open(
        `Something went wrong, please try again later`,
        'Close',
        {
          duration: 4000,
        }
      );
    }
  }

  goToComment() {
    if (this.comment.post)
      this.router.navigate([`socialapp/post/${this.comment.post.id}`]);
  }
}
