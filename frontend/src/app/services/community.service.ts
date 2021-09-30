import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse } from '../models/api-response.model';
import { Community } from '../models/community.model';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class CommunityService {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:8080/community';

  public ownedCommunities: BehaviorSubject<Array<Community>> =
    new BehaviorSubject(<Array<Community>>[]);

  public create(community: Community): Observable<string> {
    return this.http
      .post<APIResponse>(`${this.url}/create`, community, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = this.ownedCommunities.value;
          communities.push(community);
          this.ownedCommunities.next(communities);
          let message: string = response.message!;
          return message;
        })
      );
  }

  public getCommunitiesByOwner(): void {
    this.http
      .post<APIResponse>(`${this.url}/getByOwner`, null, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          let communities: Array<Community> = response.payload;
          this.ownedCommunities.next(communities);
        })
      )
      .subscribe();
  }

  public getOwnedCommunities(): Observable<Array<Community>> {
    return this.ownedCommunities.asObservable();
  }
  public deleteCommunity(community: Community): Observable<string> {
    return this.http
      .delete<APIResponse>(`${this.url}/delete`, {
        withCredentials: true,
        body: community,
      })
      .pipe(
        map((response: APIResponse) => {
          this.ownedCommunities.next(this.ownedCommunities.value.filter(c => c !== community));
          let message: string = response.message!;
          return message;
        })
      );
  }

}
