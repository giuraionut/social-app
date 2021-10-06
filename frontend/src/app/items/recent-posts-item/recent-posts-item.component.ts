import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-recent-posts-item',
  templateUrl: './recent-posts-item.component.html',
  styleUrls: ['./recent-posts-item.component.scss'],
})
export class RecentPostsItemComponent implements OnInit {
  constructor() {}
  public posts: Post[] = [];
  ngOnInit(): void {
    let date: Date = new Date('2021 09 21');

    let post: Post = {
      name: 'I really like potatoes',
      likes: 145234,
      comments: 5025,
      dateCreated: date,
    };
    this.posts.push(post);
    this.posts.push(post);
    this.posts.push(post);
    this.posts.push(post);
    this.posts.push(post);
  }
}
