import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserInfoTokenDecoder } from '../../services/userInfoTokenDecoder.service';
import { ChangeEmailDialogComponent } from '../dialogs/change-email-dialog/change-email-dialog.component';
import { ChangePasswordDialogComponent } from '../dialogs/change-password-dialog/change-password-dialog.component';
import { DeleteAccDialogComponent } from '../dialogs/delete-acc-dialog/delete-acc-dialog.component';

interface SelectModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-settings-item',
  templateUrl: './settings-item.component.html',
  styleUrls: ['./settings-item.component.scss'],
})
export class AccSettingsItemComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private userInforTokenDecoder: UserInfoTokenDecoder,
    private userService: UserService
  ) {}
  genderValue: string = '';
  countryValue: string = '';

  public country: string = 'Romania';
  public gender: string = 'Male';
  public email: string = 'test@gmail.com';

  public user: User = this.userInforTokenDecoder.getUserInfoFromToken();

  genders: SelectModel[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'other', viewValue: 'Other' },
  ];
  countries: SelectModel[] = [
    { value: 'RO', viewValue: 'Romania' },
    { value: 'UK', viewValue: 'United Kingdom' },
    { value: 'US', viewValue: 'United States' },
  ];

  ngOnInit(): void {}

  changeGender(value: string) {
    this.gender = value;
  }

  changeCountry(value: string) {
    this.country = value;
  }

  openDialog(selector: string) {
    if (selector === 'email') {
      this.openEmailDialog();
    }
    if (selector === 'password') {
      this.openPasswordDialog();
    }
    if (selector === 'delete-acc') {
      this.openDeleteAccDialog();
    }
  }

  openEmailDialog(): void {
    const dialogRef = this.dialog.open(ChangeEmailDialogComponent, {
      width: '400px',
      data: { email: this.user.email },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if(result !== null && result !== '' && result !== 'cancel') {
        this.user.email = result;
      }
    });
  }

  openPasswordDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
      data: {},
    });
    dialogRef.afterClosed().subscribe();
  }

  openDeleteAccDialog(): void {
    const dialogRef = this.dialog.open(DeleteAccDialogComponent, {
      width: '400px',
      data: { email: this.user.email },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.user.email = result;
    });
  }

  public refreshJWT()
  {
    this.userService.refreshJWT().subscribe();
  }
}
