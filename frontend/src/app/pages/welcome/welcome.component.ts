import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}

  public switch: Boolean = false;
  public message: string = 'I already have an account';

  public changeForm() {
    this.switch = !this.switch;
    this.message = this.switch
      ? "I don't have an account"
      : 'I already have an account';
  }
  ngOnInit(): void {}
}
