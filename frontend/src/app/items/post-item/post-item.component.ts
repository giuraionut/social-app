import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from '../../services/post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserInfoTokenDecoder } from '../../services/userInfoTokenDecoder.service';
@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
})
export class PostItemComponent implements OnInit {
  constructor(
    private router: Router,
    public snackBar: MatSnackBar,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private userInfoService: UserInfoTokenDecoder
  ) {}

  @Input() post: Post = {};
  @Input() page: string = '';

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.post.postMedia) {
      if (!this.post.postMedia.external) {
        this.post.postMedia.url = 'assets/' + this.post.postMedia.url;
      }
    }
    this.post.mediaHidden = false;
    this.getVotes();
    this.countComments();
  }
  public goTo() {
    this.router.navigate([`/socialapp/post/${this.post.id}`]);
  }

  public sanitizedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  public countComments(): void {
    if (this.post.id)
      this.postService.getCommentsCount(this.post.id).subscribe((c) => {
        this.post.comments = c;
      });
  }

  public getVotes(): void {
    if (this.post.id)
      this.postService.getVotes(true, this.post.id).subscribe((v) => {
        this.post.likes = v;
      });
  }
  public upvote(): void {
    if (this.post.id) {
      this.postService.vote(this.post.id, true).subscribe((message) => {
        this.getVotes();
        this.snackBar.open(
          `Up vote to ${this.post.title} ${message}!`,
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
    if (this.post.id) {
      this.postService.vote(this.post.id, false).subscribe((message) => {
        this.getVotes();
        this.snackBar.open(`Down vote ${this.post.title} ${message}`, 'Close', {
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

  public hide(): void {
    if (this.post.id)
      this.postService.hide(this.post.id, this.userInfoService.getUserInfoFromToken().username!).subscribe(() => {
        this.snackBar.open(`Post ${this.post.title} hidden!`, 'Close', {
          duration: 4000,
        });
        this.router.navigate(['socialapp/home']);
      });
  }
}
