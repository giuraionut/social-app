import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { Post } from '../../models/post.model';
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor() {}
  public post: Post = {};
  public comments: Comment[] = [];
  ngOnInit(): void {
    let post: Post = {};
    post.authorId = '592c834u2uv32c234';
    post.content =
      'Random content random content random content random content random content random content';
    post.title = 'Random title';
    post.media =
      'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg';
    post.mediaHidden = true;
    post.comments = 2;
    post.likes = 141131;
    post.id = '1';
    this.post = post;

    let comment: Comment = {};
    comment.id = '1';
    comment.content = 'blabla';
    comment.authorId = '2348237752399c8327y32';
    comment.replays = 1;
    comment.likes = 2341;
    let childs: Comment[] = [];
    let childs2: Comment[] = [];
    let childs3: Comment[] = [];
    childs3.push({ id: '3', content: 'child3', replays: 0, likes: 543 });
    childs2.push({
      id: '4',
      content: 'child2',
      childs: childs3,
      replays: 1,
      likes: 51321,
    });
    childs.push({
      id: '5',
      content: 'child1',
      childs: childs2,
      replays: 1,
      likes: 4211,
    });
    comment.childs = childs;
    let comment2: Comment = {};
    comment2.id = '2';
    comment2.content = 'blabla';
    comment2.authorId = '2348237752399c8327y32';
    comment2.replays = 0;
    comment2.likes = 1341;
    this.comments.push(comment, comment2);
  }
}
