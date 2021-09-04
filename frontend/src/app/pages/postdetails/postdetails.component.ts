import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { Post } from '../../models/post.model';
@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.scss'],
})
export class PostdetailsComponent implements OnInit {
  constructor() {}
  public post: Post = {};
  public comments: Comment[] = [];
  ngOnInit(): void {
    let post: Post = {};
    post.authorId = '592c834u2uv32c234';
    post.content =
      'Random content random content random content random content random content random content';
    post.name = 'Random name';
    post.media =
      'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg';
    post.mediaHidden = true;
    this.post = post;

    let comment: Comment = {};
    comment.content = 'blabla';
    comment.authorId = '2348237752399c8327y32';
    comment.replays = 3;
    let childs: Comment[] = [];
    let childs2: Comment[] = [];
    let childs3: Comment[] = [];
    childs3.push({ content: 'child3', replays: 0 });
    childs2.push({ content: 'child2', childs: childs3, replays: 1 });
    childs.push({ content: 'child1', childs: childs2, replays: 1 });
    comment.childs = childs;
    let comment2: Comment = {};
    comment2.content = 'blabla';
    comment2.authorId = '2348237752399c8327y32';
    comment2.replays = 0;
    this.comments.push(comment, comment2);
  }
}
