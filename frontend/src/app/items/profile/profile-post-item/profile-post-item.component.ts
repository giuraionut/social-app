import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-profile-post-item',
  templateUrl: './profile-post-item.component.html',
  styleUrls: ['./profile-post-item.component.scss']
})
export class ProfilePostItemComponent implements OnInit {

  constructor(private router: Router, public snackBar: MatSnackBar, private postService: PostService) { }

  @Input() post: Post = {};
  @Input() page: string = '';

  ngOnInit(): void {
  }

  public goTo(post: Post) {
    this.router.navigate([`/socialapp/post/${post.id}`]);
  }

  public delete(post: Post):void{
    this.snackBar.open(`Post ${post.title} deleted!`, "Close", {duration:4000});
  }

  public hide(post: Post): void{
    this.postService.changeVisibility(this.post, false).subscribe(()=> {
      this.snackBar.open(`Post ${post.title} hidden!`, "Close", {duration:4000});
    })
  }
  public unhide(post: Post): void{
    this.postService.changeVisibility(this.post, true).subscribe(()=> {
      this.snackBar.open(`Post ${post.title} made visible!`, "Close", {duration:4000});
    })
  }
  
}
