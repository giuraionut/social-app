import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-profile-post-item',
  templateUrl: './profile-post-item.component.html',
  styleUrls: ['./profile-post-item.component.scss']
})
export class ProfilePostItemComponent implements OnInit {

  constructor(private router: Router, public snackBar: MatSnackBar) { }

  @Input() post: Post = {};
  @Input() page: string = '';

  ngOnInit(): void {
  }

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
