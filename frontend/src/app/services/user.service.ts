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
  private url = 'http://localhost:8080/user';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  public register(user: User): Observable<void> {
    return this.http.post(`${this.url}/register`, user).pipe(
      mergeMap(() => {
        let userToLogin: User = {
          username: user.username,
          password: user.password,
        };
        return this.authService.login(userToLogin);
      })
    );
  }

  public deleteAccount(password: string): Observable<void> {
    return this.http
      .delete(`${this.url}/delete`, {
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
      .post(`${this.url}/signout`, null, { withCredentials: true })
      .pipe(
        map(() => {
          this.cookieService.delete('loggedIn');
          this.router.navigate(['/socialapp/welcome']);
        })
      );
  }

  public changePassword(oldPass: string, newPass: string): Observable<void> {
    return this.http
      .post(
        `${this.url}/password/change`,
        { oldPassword: oldPass, newPassword: newPass },
        { withCredentials: true }
      )
      .pipe(map(() => {}));
  }

  public changeEmail(email: string, pass: string): Observable<void> {
    return this.http
      .post(
        `${this.url}/email/change`,
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
      .post(`${this.url}/jwt/refresh`, null, {
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
      .post(`${this.url}/info/token/refresh`, null, {
        withCredentials: true,
      })
      .pipe(map(() => {}));
  }
}
