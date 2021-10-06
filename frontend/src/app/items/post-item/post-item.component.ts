import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  constructor(private router: Router, public snackBar: MatSnackBar) {}

  @Input() post: Post = {};
  @Input() page: string = '';
  ngOnInit(): void {}

  public goTo(post: Post) {
    this.router.navigate([`/socialapp/post/${post.id}`]);
  }

  public upvote(post: Post):void{
    this.snackBar.open(`Post ${post.name} upvoted!`, "Close", {duration:4000});
  }
  public downvote(post: Post):void{
    this.snackBar.open(`Post ${post.name} downvoted!`, "Close", {duration:4000});
  }

  public delete(post: Post):void{
    this.snackBar.open(`Post ${post.name} deleted!`, "Close", {duration:4000});
  }

  public hide(post: Post): void{
    this.snackBar.open(`Post ${post.name} hidden!`, "Close", {duration:4000});
    post.hidden = true;
  }
  public unhide(post: Post): void{
    this.snackBar.open(`Post ${post.name} made visible!`, "Close", {duration:4000});
    post.hidden = false;
  }
}
