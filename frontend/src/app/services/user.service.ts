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
  private url = 'http://localhost:8080/user';

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

  public deleteAccount(password: string): Observable<String> {
    return this.http
      .delete<APIResponse>(`${this.url}/delete`, {
        withCredentials: true,
        body: password,
      })
      .pipe(
        map((response: APIResponse) => {
          return response.message!;
        })
      );
  }

  public logout(): void {
    this.http
      .post<APIResponse>(`${this.url}/signout`, null, { withCredentials: true })
      .pipe(
        map((result: APIResponse) => {
          this.cookieService.delete('loggedIn');
          this.router.navigate(['/socialapp/welcome']);
        })
      )
      .subscribe();
  }

  public changePassword(oldPass: string, newPass: string): void {
    this.http
      .post<APIResponse>(
        `${this.url}/password/change`,
        { oldPassword: oldPass, newPassword: newPass },
        {
          withCredentials: true,
        }
      )
      .pipe(map((result: APIResponse) => {}))
      .subscribe();
  }

  public changeEmail(email: string, pass: string): void {
    this.http
      .post<APIResponse>(
        `${this.url}/email/change`,
        { email: email, password: pass },
        {
          withCredentials: true,
        }
      )
      .pipe(
        map((result: APIResponse) => {
          this.refreshUserInfoToken();
        })
      )
      .subscribe();
  }

  public refreshJWT(): void {
    this.http
      .post<APIResponse>(`${this.url}/jwt/refresh`, null, {
        withCredentials: true,
      })
      .pipe(
        map((result: APIResponse) => {
          this.cookieService.set('loggedIn', 'true', 1);
        })
      )
      .subscribe();
  }

  public refreshUserInfoToken(): void {
    this.http
      .post<APIResponse>(`${this.url}/info/token/refresh`, null, {
        withCredentials: true,
      })
      .pipe(map((result: APIResponse) => {}))
      .subscribe();
  }
}
