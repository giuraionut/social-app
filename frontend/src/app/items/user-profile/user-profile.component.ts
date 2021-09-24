import { Component, OnInit, Testability } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor() {}

  public user: User = {};
  ngOnInit(): void {
    this.user.email = 'test@gmail.com';
    this.user.username = 'test';
  }
}
