import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';
@Injectable({ providedIn: 'root' })
export class UserInfoTokenDecoder {
  constructor(private cookieService: CookieService) {}

  private token = this.cookieService.get('userInfoToken');
  public getUserInfoFromToken(): User {
    let user: User = {};
  
    let decoded_token: any = jwt_decode(this.token);
    user.email = decoded_token.email;
    user.username = decoded_token.username;

    user.avatar = decoded_token.avatar;
    return user;
  }
}
