import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../../models/comment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateCommentDialogComponent } from '../dialogs/create-comment-dialog/create-comment-dialog.component';
import { CommentService } from '../../services/comment.service';
import { User } from '../../models/user.model';
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

  ngOnInit(): void {}

  ngOnChanges(): void {
    this.countReplays();
    this.getVotes();
  }
  public upvote(): void {
    if (this.comment.id) {
      this.commentService.vote(true, this.comment.id).subscribe((message) => {
        this.getVotes();
        if (this.comment.author)
          this.snackBar.open(
            `Up vote to ${this.comment.author.username} ${message}!`,
            'Close',
            {
              duration: 4000,
            }
          );
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
  public downvote(): void {
    if (this.comment.id) {
      this.commentService.vote(false, this.comment.id).subscribe((message) => {
        this.getVotes();
        if (this.comment.author)
          this.snackBar.open(
            `Down vote ${this.comment.author.username} ${message}`,
            'Close',
            {
              duration: 4000,
            }
          );
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
          this.countReplays();
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

  countReplays() {
    if (this.comment.id)
      this.commentService.countChilds(this.comment.id).subscribe((c) => {
        this.comment.replays = c;
      });
  }

  public getVotes(): void {
    if (this.comment.id)
      this.commentService.getVotes(this.comment.id).subscribe((v) => {
        this.comment.likes = v;
      });
  }
}
