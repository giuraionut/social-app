import { Component, OnInit} from '@angular/core';
import { User } from '../../models/user.model';
import { UserInfoTokenDecoder } from '../../services/userInfoTokenDecoder.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  constructor(private userInfoTokenDecoder: UserInfoTokenDecoder) {}

  public user: User = this.userInfoTokenDecoder.getUserInfoFromToken();
  ngOnInit(): void {
  }
}
