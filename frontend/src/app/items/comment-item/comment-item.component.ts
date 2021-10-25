import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../../models/comment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateCommentDialogComponent } from '../dialogs/create-comment-dialog/create-comment-dialog.component';
import { CommentService } from '../../services/comment.service';
@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
  ) {}
  @Input() comment: Comment = {};
  @Input() page?: string = '';

  ngOnInit(): void {

  }

  public upvote(comment: Comment): void {
    this.snackBar.open(`Comment upvoted!`, 'Close', { duration: 4000 });
  }
  public downvote(comment: Comment): void {
    this.snackBar.open(`Comment downvoted!`, 'Close', { duration: 4000 });
  }

  public delete(comment: Comment): void {
    this.snackBar.open(`Comment deleted!`, 'Close', { duration: 4000 });
  }

  goToComment(comment: Comment) {
    if (comment.post)
      this.router.navigate([`socialapp/post/${comment.post.id}`]);
  }
  replyToComment(commentId: string) {
    const dialogRef = this.dialog.open(CreateCommentDialogComponent, {
      width: '700px',
      data: { cId: commentId },
    });
    dialogRef.afterClosed().subscribe((comment) => {
      this.comment.childs!.push(comment);
      console.log('Closed');
    });
  }
}
