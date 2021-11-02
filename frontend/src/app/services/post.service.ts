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

  private hidden: BehaviorSubject<Array<Post>> = new BehaviorSubject(
    <Array<Post>>[]
  );

  private byCommunity: BehaviorSubject<Array<Post>> = new BehaviorSubject(
    <Array<Post>>[]
  );

  private feed: BehaviorSubject<Array<Post>> = new BehaviorSubject(
    <Array<Post>>[]
  );

  private byId: BehaviorSubject<Post> = new BehaviorSubject({});

  public create(post: Post, communityTitle: string): Observable<Post> {
    return this.http
      .post(`${this.url}/community/${communityTitle}`, post, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let posts: Array<Post> = this.owned.value;
          posts.push(response.payload);
          this.owned.next(posts);
          return response.payload;
        })
      );
  }

  public delete(postId: string): Observable<string> {
    return this.http
      .delete(`${this.url}/${postId}`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let posts: Array<Post> = this.owned.value;
          posts = posts.filter((p) => p.id != postId);
          this.owned.next(posts);
          return response.message!;
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

  public getOwned(deleted: boolean): Observable<Array<Post>> {
    return this.http
      .get(`${this.url}/owned/${deleted}`, {
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

  public getHidden(): Observable<Array<Post>> {
    return this.http
      .get(`${this.url}/hidden`, {
        withCredentials: true,
      })
      .pipe(
        mergeMap((response: APIResponse) => {
          let posts: Array<Post> = response.payload;
          this.hidden.next(posts);
          return this.hidden;
        })
      )
      .pipe(
        mergeMap(() => {
          return this.hidden.asObservable();
        })
      );
  }
  public getFeed(): Observable<Array<Post>> {
    return this.http
      .get(`${this.url}/feed`, {
        withCredentials: true,
      })
      .pipe(
        mergeMap((response: APIResponse) => {
          let posts: Array<Post> = response.payload;
          this.feed.next(posts);
          return this.feed;
        })
      )
      .pipe(
        mergeMap(() => {
          return this.feed.asObservable();
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

  public hide(postId: string): Observable<string> {
    return this.http
      .post(`${this.url}/hide/${postId}`, null, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let feedPosts: Array<Post> = this.feed.value;
          feedPosts = feedPosts.filter(p => p.id != postId);
          this.feed.next(feedPosts);
          return response.message!;
        })
      );
  }

  public unHide(postId: string): Observable<string> {
    return this.http
      .post(`${this.url}/unHide/${postId}`, null, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let hiddenPosts: Array<Post> = this.hidden.value;
          hiddenPosts = hiddenPosts.filter(p => p.id != postId);
          this.hidden.next(hiddenPosts);
          return response.message!;
        })
      );
  }
  public vote(value: boolean, postId: string): Observable<string> {
    return this.http
      .post(`${this.url}/${postId}/vote/${value}`, null, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          return response.message!;
        })
      );
  }

  public getVotes(value: boolean, postId: string): Observable<number> {
    return this.http
      .get(`${this.url}/${postId}/votes/${value}`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          return response.payload;
        })
      );
  }

  public getCommentsCount(postId: string): Observable<number> {
    return this.http
      .get(`${this.url}/${postId}/comments/count`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          return response.payload;
        })
      );
  }

  public getVotedPosts(): Observable<Array<Post>> {
    return this.http
      .get(`${this.url}/voted/all`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          return response.payload;
        })
      );
  }
  //-----------------------------------------------------------------------------------------------
}
