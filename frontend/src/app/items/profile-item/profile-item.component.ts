import { Component, OnInit} from '@angular/core';
import { User } from '../../models/user.model';
import { UserInfoTokenDecoder } from '../../services/userInfoTokenDecoder.service';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss'],
})
export class ProfileItemComponent implements OnInit {
  constructor(private userInfoTokenDecoder: UserInfoTokenDecoder) {}

  public user: User = this.userInfoTokenDecoder.getUserInfoFromToken();
  ngOnInit(): void {
  }
}
