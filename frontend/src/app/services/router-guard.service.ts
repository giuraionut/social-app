import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class RouterGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate() {
    let loggedIn = this.cookieService.get('loggedIn');
    if (loggedIn) {
      if (JSON.parse(loggedIn) === true) {
        return true;
      } else {
        this.router.navigate(['socialapp/welcome']);
        return false;
      }
    }
    this.router.navigate(['socialapp/welcome']);
    return false;
  }
}
