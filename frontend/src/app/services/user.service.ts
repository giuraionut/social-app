import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
@Injectable({ providedIn: 'root' })
export class UserService {
  private url = 'http://localhost:8080/api/v1/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  public register(user: User): Observable<void> {
    return this.http.post(`${this.url}/register`, user).pipe(
      mergeMap(() => {
        return this.authService.login(user);
      })
    );
  }

  public deleteAccount(password: string): Observable<void> {
    return this.http
      .delete(`${this.url}/account`, {
        withCredentials: true,
        body: password,
      })
      .pipe(
        mergeMap(() => {
          return this.logout();
        })
      );
  }

  public logout(): Observable<void> {
    return this.http
      .post(`${this.url}/me/logout`, null, { withCredentials: true })
      .pipe(
        map(() => {
          this.cookieService.delete('loggedIn');
          this.router.navigate(['/socialapp/welcome']);
        })
      );
  }

  public changePassword(oldPass: string, newPass: string): Observable<void> {
    return this.http
      .put(
        `${this.url}/password`,
        { oldPassword: oldPass, newPassword: newPass },
        { withCredentials: true }
      )
      .pipe(map(() => {}));
  }

  public changeEmail(email: string, pass: string): Observable<void> {
    return this.http
      .put(
        `${this.url}/email`,
        { email: email, password: pass },
        { withCredentials: true }
      )
      .pipe(
        mergeMap(() => {
          return this.refreshUserInfoToken();
        })
      );
  }

  public refreshJWT(): Observable<void> {
    return this.http
      .post(`${this.url}/me/jwt/refresh`, null, {
        withCredentials: true,
      })
      .pipe(
        map(() => {
          this.cookieService.set('loggedIn', 'true', 1);
        })
      );
  }

  public refreshUserInfoToken(): Observable<void> {
    return this.http
      .post(`${this.url}/me/uit/refresh`, null, {
        withCredentials: true,
      })
      .pipe(map(() => {}));
  }
}
