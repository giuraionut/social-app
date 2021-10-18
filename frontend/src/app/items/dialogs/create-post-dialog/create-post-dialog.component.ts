import { Component, Inject, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Community } from '../../../models/community.model';
import { DeleteAccDialogComponent } from '../delete-acc-dialog/delete-acc-dialog.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss'],
})
export class CreatePostDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService,
    public dialogRef: MatDialogRef<CreatePostDialogComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createPost(title: string, content: string) {
    let post: Post = {
      title: title,
      content: content,
      creationDate: new Date(),
    };
    let community: Community = this.data.community;
    console.log(community);
    this.postService.create(post, community.title!).subscribe((post: Post) => {
      this.dialogRef.close();
      this.router.navigate([`socialapp/post/${post.id}`])
    });
  }

  
}
