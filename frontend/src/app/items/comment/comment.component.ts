import { Component, Input, OnInit } from '@angular/core';

import { Comment } from '../../models/comment.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor(public snackBar: MatSnackBar, private router: Router) {}
  @Input() comment: Comment = {};
  @Input() page: string = '';
  ngOnInit(): void {}

 
  public upvote(comment: Comment):void{
    this.snackBar.open(`Comment upvoted!`, "Close", {duration:4000});
  }
  public downvote(comment: Comment):void{
    this.snackBar.open(`Comment downvoted!`, "Close", {duration:4000});
  }

  public delete(comment: Comment):void{
    this.snackBar.open(`Comment deleted!`, "Close", {duration:4000});
  }

  goToComment(comment: Comment)
  {
      this.router.navigate([`socialapp/post/${comment.postId}`]);
  }
}
