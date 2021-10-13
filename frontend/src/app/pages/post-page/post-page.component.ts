import { Component, OnInit } from '@angular/core';
import { Comment } from '../../models/comment.model';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { Community } from '../../models/community.model';
@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostDetailsComponent implements OnInit {
  constructor(private postService: PostService, private route: ActivatedRoute) {}
  public post: Post = {};
  public comments: Comment[] = [];
  public community: Community = {};
  ngOnInit(): void {
    this.route.params
    .pipe(
      mergeMap((params) => {
        return this.postService.getById(params['postId']);
      }))
    .pipe(
      map((post) => {
        this.post = post;
        console.log(post);
        this.post.mediaHidden = true;
        this.community = this.post.community!;
      })).subscribe();
    
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
