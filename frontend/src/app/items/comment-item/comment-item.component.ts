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
    private commentService: CommentService
  ) {}
  @Input() comment: Comment = {};
  @Input() page?: string = '';

  ngOnInit(): void {
    if (this.comment.id) this.countReplays(this.comment.id);
  }

  ngOnChange(): void {
    if (this.comment.id) this.countReplays(this.comment.id);
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
  replyToComment() {
    if (this.comment.id) {
      const dialogRef = this.dialog.open(CreateCommentDialogComponent, {
        width: '700px',
        data: { cId: this.comment.id },
      });
      dialogRef.afterClosed().subscribe((comment) => {
        if (this.comment.id) {
          this.countReplays(this.comment.id);
        } else {
          console.log(
            `Something went wrong trying to count childs of comment with id ${this.comment.id}`
          );
        }
        this.comment.childs!.push(comment);
        console.log('Closed');
      });
    } else {
      console.log(
        `Something went wrong trying to reply to comment with id ${this.comment.id}`
      );
    }
  }

  countReplays(id: string) {
    this.commentService.countChilds(id).subscribe((c) => {
      this.comment.replays = c;
    });
  }
}
