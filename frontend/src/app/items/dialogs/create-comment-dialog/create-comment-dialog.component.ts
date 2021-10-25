import { Component, Inject, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../models/comment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-create-comment-dialog',
  templateUrl: './create-comment-dialog.component.html',
  styleUrls: ['./create-comment-dialog.component.scss'],
})
export class CreateCommentDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateCommentDialogComponent>,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {}
  createComment(content: string) {
    let parentId = this.data.cId;
    let comment: Comment = {};
    comment.content = content;
    comment.creationDate = new Date();

    this.commentService
      .reply(comment, parentId)
      .subscribe((comment: Comment) => {
        this.dialogRef.close(comment);
      });
  }
}
