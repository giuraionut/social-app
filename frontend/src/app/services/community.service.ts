import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../models/api-response.model';
import { Community } from '../models/community.model';
import { map, mergeMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CommunityService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:8080/community';

  //-----------------------------------------------------------------------------------------------
  private owned: BehaviorSubject<Array<Community>> = new BehaviorSubject(
    <Array<Community>>[]
  );

  private joined: BehaviorSubject<Array<Community>> = new BehaviorSubject(
    <Array<Community>>[]
  );

  private topCommunities: BehaviorSubject<Array<Community>> = new BehaviorSubject(
    <Array<Community>>[]
  );

  private community: BehaviorSubject<Community> = new BehaviorSubject({});

  public create(community: Community): Observable<void> {
    return this.http
      .post(`${this.url}`, community, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let ownedCommunities: Array<Community> = this.owned.value;
          ownedCommunities.push(response.payload);
          let joinedCommunities: Array<Community> = this.joined.value;
          joinedCommunities.push(response.payload);
          this.owned.next(ownedCommunities);
          this.joined.next(joinedCommunities);
        })
      );
  }

  public getOwned(): Observable<Array<Community>> {
    return this.http
      .get(`${this.url}/owned/all`, {
        withCredentials: true,
      })
      .pipe(
        mergeMap((response: APIResponse) => {
          let communities: Array<Community> = response.payload;
          this.owned.next(communities);
          return this.owned;
        })
      )
      .pipe(
        mergeMap(() => {
          return this.owned.asObservable();
        })
      );
  }

  public getJoined(): Observable<Array<Community>> {
    return this.http
      .get(`${this.url}/joined/all`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = response.payload;
          this.joined.next(communities);
        })
      )
      .pipe(
        mergeMap(() => {
          return this.joined.asObservable();
        })
      );
  }

  public isJoined(communityId: string): Observable<boolean> {
    return this.http
      .get(`${this.url}/${communityId}/joined`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          return response.payload;
        })
      );
  }

  public deleteOwned(community: Community): Observable<void> {
    return this.http
      .delete(`${this.url}`, {
        withCredentials: true,
        body: community,
      })
      .pipe(
        map(() => {
          this.owned.next(this.owned.value.filter((c) => c !== community));
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

  public getTopCommunities(quantity: number): Observable<Array<Community>> {
    return this.http
      .get(`${this.url}/multiple/${quantity}/top`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = response.payload;
          this.topCommunities.next(communities);
        })
      )
      .pipe(
        mergeMap(() => {
          return this.topCommunities.asObservable();
        })
      );
  }

  public join(communityId: string): Observable<void> {
    return this.http
      .put(`${this.url}/join`, communityId, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = this.joined.value;
          communities.push(response.payload);
          this.joined.next(communities);
        })
      );
  }
  public leave(communityId: string): Observable<void> {
    return this.http
      .put(`${this.url}/leave`, communityId, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = this.joined.value;
          communities.push(response.payload);
          this.joined.next(
            communities.filter((c) => c.id !== response.payload.id)
          );
        })
      );
  }
}

//-----------------------------------------------------------------------------------------------
