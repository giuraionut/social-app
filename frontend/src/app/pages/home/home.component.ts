import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  public posts: Post[] = [];
 
  ngOnInit(): void {
    let post: Post = {};
    post.authorId = '592c834u2uv32c234';
    post.content =
      'Random content random content random content random content random content random content';
    post.name = 'Random name';
    post.media =
      'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg';
    post.mediaHidden = true;
    post.comments = 2;
    let post2: Post = {};
    post2.authorId = '592c834u2uv32c234';
    post2.content =
      'Random content random content random content random content random content random content';
    post2.name = 'Random name';
    post2.media =
      'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg';
    post2.mediaHidden = true;
    post2.comments = 2;
    this.posts.push(post, post2);
    //--------------------------------------------------------------------------------------------------------------
    
  }
}
