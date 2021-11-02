import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Post } from '../../../../models/post.model';
import { PostService } from '../../../../services/post.service';

@Component({
  selector: 'app-profile-post-item',
  templateUrl: './profile-post-item.component.html',
  styleUrls: ['./profile-post-item.component.scss']
})
export class ProfilePostItemComponent implements OnInit {

  @Input() post: Post = {};

  constructor(private router: Router, public snackBar: MatSnackBar, private postService: PostService) { }

  ngOnInit(): void {
  }

  public goTo(post: Post) {
    this.router.navigate([`/socialapp/post/${post.id}`]);
  }

  public delete():void{
    if (this.post.id) {
      this.postService.delete(this.post.id).subscribe((message) => {
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
}
