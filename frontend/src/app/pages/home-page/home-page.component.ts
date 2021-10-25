import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private postService: PostService) {}

  public posts: Post[] = [];
  public communities = false;
  public nrOfCols = 4;
  ngOnInit(): void {
    this.postService.getFeed().subscribe((feed) => {
      this.posts = feed;
    });
  }
}
