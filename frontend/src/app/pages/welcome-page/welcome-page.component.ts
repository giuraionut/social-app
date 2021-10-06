import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(private router: Router, private cookieService: CookieService) {}

  public switch: Boolean = false;
  public message: string = 'I already have an account';

  public changeForm() {
    this.switch = !this.switch;
    this.message = this.switch
      ? "I don't have an account"
      : 'I already have an account';
  }
  ngOnInit(): void {
    let loggedIn = this.cookieService.get('loggedIn');
    if (loggedIn) {
      if (JSON.parse(loggedIn) === true) {
        this.router.navigate(['socialapp/home']);
      }
    }
  }
}
