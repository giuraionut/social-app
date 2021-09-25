import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor() {}

  public posts: Post[] = [];
  public communities = false;
  public nrOfCols = 4;

  public comments: Comment[] = [];
  public show: string = 'posts';
  ngOnInit(): void {
    let post: Post = {};
    post.id = '1';
    post.authorId = '592c834u2uv32c234';
    post.content =
      'Random content random content random content random content random content random content';
    post.name = 'Random name';
    post.media =
      'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg';
    post.mediaHidden = true;
    post.comments = 2;
    post.likes = 194815;
    let post2: Post = {};
    post2.id = '2';
    post2.authorId = '592c834u2uv32c234';
    post2.content =
      'Random content random content random content random content random content random content';
    post2.name = 'Random name';
    post2.media =
      'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg';
    post2.mediaHidden = true;
    post2.comments = 2;
    post2.likes = 494815;

    post.hidden = true;
    post2.hidden = false;
    this.posts.push(post, post2);

    let comment: Comment = {};
    comment.id = '1';
    comment.content = 'blabla';
    comment.likes = 1412;
    comment.dislikes = 120;
    comment.replays = 20;
    comment.parentId = '1';
    comment.authorId = '1';

    let comment2: Comment = {};
    comment2.id = '1';
    comment2.content = 'blabla';
    comment2.likes = 1412;
    comment2.dislikes = 120;
    comment2.replays = 20;
    comment2.parentId = '1';
    comment2.authorId = '1';
    this.comments.push(comment, comment2);
    //--------------------------------------------------------------------------------------------------------------
  }
  public change(page: string): void {
    this.show = page;
  }
}
