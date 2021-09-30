import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { APIResponse } from '../models/api-response.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RefreshToken } from '../models/refresh-token.model';
import { CookieService } from 'ngx-cookie-service';
@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  public login(user: User): void {
    this.http
      .post<APIResponse>(`${this.url}/login`, user, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          this.cookieService.set('loggedIn', 'true', 1);
          this.router.navigate(['/socialapp/home']);
        })
      )
      .subscribe();
  }

  public refreshToken(refreshToken: RefreshToken): Observable<void> {
    return this.http
      .post<APIResponse>(`${this.url}/token/refresh`, refreshToken, {
        withCredentials: true,
      })
      .pipe(
        map((result: APIResponse) => {
          this.cookieService.set('loggedIn', 'true', 1);
        })
      );
  }

}
