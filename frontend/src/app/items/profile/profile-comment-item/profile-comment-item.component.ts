import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Comment } from '../../../models/comment.model';
@Component({
  selector: 'app-profile-comment-item',
  templateUrl: './profile-comment-item.component.html',
  styleUrls: ['./profile-comment-item.component.scss'],
})
export class ProfileCommentItemComponent implements OnInit {
  constructor(private router: Router, private snackBar: MatSnackBar) {}
  @Input() comment: Comment = {};
  
  ngOnInit(): void {}

  public upvote(comment: Comment): void {
    this.snackBar.open(`Comment upvoted!`, 'Close', { duration: 4000 });
  }
  public downvote(comment: Comment): void {
    this.snackBar.open(`Comment downvoted!`, 'Close', { duration: 4000 });
  }

  public delete(comment: Comment): void {
    this.snackBar.open(`Comment deleted!`, 'Close', { duration: 4000 });
  }

  goToComment() {
    this.router.navigate([`socialapp/post/${this.comment.postId}`]);
  }
}
