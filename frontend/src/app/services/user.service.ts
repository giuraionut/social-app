import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { APIResponse } from '../models/api-response.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  public register(user: User): Observable<String> {
    return this.http.post<APIResponse>(`${this.url}/register`, user).pipe(
      map((response: APIResponse) => {
        return response.message!;
      })
    );
  }

  public getAuthenticated(): Observable<User> {
    return this.http
      .get<APIResponse>(`${this.url}/user/authenticated`, {
        withCredentials: true,
      })
      .pipe(
        map((response: APIResponse) => {
          return response.payload;
        })
      );
  }
}
