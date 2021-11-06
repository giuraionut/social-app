import { Component, Inject, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Community } from '../../../models/community.model';
import { Router } from '@angular/router';
import { CommunityService } from '../../../services/community.service';
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
    private router: Router,
    private communityService: CommunityService
  ) {}

  ngOnInit(): void {
    if (this.data.community) {
      this.selectedCommunity = this.data.community;
      this.selectedCommunityLabel = this.data.community.title;
      this.buttonDisabled = false;
    }

    this.communityService.getJoined().subscribe((communities) => {
      this.joinedCommunities = communities;
    });
  }

  selectedCommunityLabel = 'Select a community';
  selectedCommunity: Community = {};
  joinedCommunities: Community[] = [];
  uploadButtonDisabled: boolean = false;
  post: Post = {};
  mediaFile: File = new File([''], '');

  buttonDisabled: boolean = true;
  goToCommunity(title: string) {
    this.router.navigate([`socialapp/community/${title}`]);
  }

  createPost(title: string, content: string) {
    this.post.title = title;
    this.post.content = content;
    this.post.creationDate = new Date();
    const formData = new FormData();
    formData.append('media', this.mediaFile, 'media.png');
    formData.append(
      'post',
      new Blob([JSON.stringify(this.post)], { type: 'application/json' })
    );

    if (this.uploadButtonDisabled) {
      formData.set('media', new File([''], ''));
    }

    if (this.selectedCommunity.title) {
      this.postService
        .create(formData, this.selectedCommunity.title)
        .subscribe((post: Post) => {
          this.dialogRef.close();
          this.router.navigate([`socialapp/post/${post.id}`]);
        });
    }
  }

  setCommunity(communityTitle: string) {
    if (this.selectedCommunity == null) {
      this.communityService
        .getByTitle(communityTitle)
        .subscribe((community: Community) => {
          this.selectedCommunity = community;
          if (community.title) this.selectedCommunityLabel = community.title;
          this.buttonDisabled = false;
        });
    }
  }

  checkLink(link: string) {
    if (link === '') {
      this.uploadButtonDisabled = false;
      this.post.mediaUrl = '';
    } else {
      this.uploadButtonDisabled = true;
      this.post.mediaUrl = link;
    }
  }

  getImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.mediaFile = event.target.files[0];
    }
  }
}
