import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../models/api-response.model';
import { Community } from '../models/community.model';
import { map, mergeMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CommunityService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:8080/community';

  //-----------------------------------------------------------------------------------------------
  private ownedCommunities: BehaviorSubject<Array<Community>> =
    new BehaviorSubject(<Array<Community>>[]);

  private joinedCommunities: BehaviorSubject<Array<Community>> =
    new BehaviorSubject(<Array<Community>>[]);

  private community: BehaviorSubject<Community> = new BehaviorSubject({});

  public create(community: Community): Observable<void> {
    return this.http
      .post(`${this.url}`, community, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = this.ownedCommunities.value;
          communities.push(response.payload);
          this.ownedCommunities.next(communities);
        })
      );
  }

  public getOwnedCommunities(): Observable<Array<Community>> {
    return this.http
      .get(`${this.url}/owned`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = response.payload;
          this.ownedCommunities.next(communities);
        })
      )
      .pipe(
        mergeMap(() => {
          return this.ownedCommunities.asObservable();
        })
      );
  }

  public getJoinedCommunities(): Observable<Array<Community>> {
    return this.http
      .get(`${this.url}/joined`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = response.payload;
          this.joinedCommunities.next(communities);
        })
      )
      .pipe(
        mergeMap(() => {
          return this.joinedCommunities.asObservable();
        })
      );
  }

  public deleteOwnedCommunity(community: Community): Observable<void> {
    return this.http
      .delete(`${this.url}`, {
        withCredentials: true,
        body: community,
      })
      .pipe(
        map(() => {
          this.ownedCommunities.next(
            this.ownedCommunities.value.filter((c) => c !== community)
          );
        })
      );
  }

  public getByTitle(title: string): Observable<Community> {
    return this.http
      .get(`${this.url}/${title}`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          this.community.next(response.payload);
        })
      )
      .pipe(
        mergeMap(() => {
          return this.community.asObservable();
        })
      );
  }

  public join(communityId: string): Observable<void> {
    return this.http
      .put(`${this.url}/join`, communityId, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = this.joinedCommunities.value;
          communities.push(response.payload);
          this.joinedCommunities.next(communities);
        })
      );
  }
  public leave(communityId: string): Observable<void> {
    return this.http
      .put(`${this.url}/leave`, communityId, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = this.joinedCommunities.value;
          communities.push(response.payload);
          this.joinedCommunities.next(communities.filter((c) => c.id !== response.payload.id));
        })
      );
  }
}

//-----------------------------------------------------------------------------------------------
