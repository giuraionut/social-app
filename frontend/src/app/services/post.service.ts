import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../models/api-response.model';
import { Post } from '../models/post.model';
import { map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:8080/post';

  //-----------------------------------------------------------------------------------------------
  private owned: BehaviorSubject<Array<Post>> = new BehaviorSubject(
    <Array<Post>>[]
  );

  private byCommunity: BehaviorSubject<Array<Post>> = new BehaviorSubject(
    <Array<Post>>[]
  );

  private byId: BehaviorSubject<Post> = new BehaviorSubject({});

  public create(post: Post, communityTitle: string): Observable<Post> {
    return this.http
      .post(`${this.url}/community/${communityTitle}`, post, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let posts: Array<Post> = this.owned.value;
          posts.push(response.payload);
          this.owned.next(posts);
          return response.payload;
        })
      );
  }

  public getByCommunity(communityId: string): Observable<Array<Post>> {
    return this.http
      .get(`${this.url}/community/${communityId}`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          this.byCommunity.next(response.payload);
        })
      )
      .pipe(
        mergeMap(() => {
          return this.byCommunity.asObservable();
        })
      );
  }

  public getOwned(): Observable<Array<Post>> {
    return this.http
      .get(`${this.url}/owned`, {
        withCredentials: true,
      })
      .pipe(
        mergeMap((response: APIResponse) => {
          let posts: Array<Post> = response.payload;
          this.owned.next(posts);
          return this.owned;
        })
      )
      .pipe(
        mergeMap(() => {
          return this.owned.asObservable();
        })
      );
  }

  public getById(postId: string): Observable<Post> {
    return this.http
      .get(`${this.url}/id/${postId}`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          this.byId.next(response.payload);
        })
      )
      .pipe(
        mergeMap(() => {
          return this.byId.asObservable();
        })
      );
  }

  public changeVisibility(post: Post, value: boolean): Observable<void> {
    return this.http
      .put(`${this.url}/hidden/${value}`, post, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let posts: Array<Post> = this.owned.value;
          posts.find((p) => p === post)!.visible = value;
          this.owned.next(posts);
        })
      );
  }
  //-----------------------------------------------------------------------------------------------
}
