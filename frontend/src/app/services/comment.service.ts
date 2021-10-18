import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../models/api-response.model';

import { map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
@Injectable({ providedIn: 'root' })
export class CommentService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:8080/comment';

  //-----------------------------------------------------------------------------------------------
  private owned: BehaviorSubject<Array<Comment>> = new BehaviorSubject(
    <Array<Comment>>[]
  );

  private byPost: BehaviorSubject<Array<Comment>> = new BehaviorSubject(
    <Array<Comment>>[]
  );

  private byId: BehaviorSubject<Comment> = new BehaviorSubject({});

  public create(comment: Comment, postId: string): Observable<Comment> {
    return this.http
      .post(`${this.url}/post/${postId}`, comment, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let comments: Array<Comment> = this.owned.value;
          comments.push(response.payload);
          this.owned.next(comments);
          let commentsByPost: Array<Comment> = this.byPost.value;
          commentsByPost.push(response.payload);
          this.byPost.next(commentsByPost);
          return response.payload;
        })
      );
  }

  public getByPost(postId: string): Observable<Array<Comment>> {
    return this.http
      .get(`${this.url}/post/${postId}`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          this.byPost.next(response.payload);
        })
      )
      .pipe(
        mergeMap(() => {
          return this.byPost.asObservable();
        })
      );
  }


  public getOwned(): Observable<Array<Comment>> {
    return this.http
      .get(`${this.url}/owned`, {
        withCredentials: true,
      })
      .pipe(
        mergeMap((response: APIResponse) => {
          let comments: Array<Comment> = response.payload;
          this.owned.next(comments);
          return this.owned;
        })
      )
      .pipe(
        mergeMap(() => {
          return this.owned.asObservable();
        })
      );
  }

  //-----------------------------------------------------------------------------------------------
}
