import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
})
export class ChangePasswordDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  changePass(
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ): void {
    if (newPassword === confirmNewPassword) {
      this.userService
        .changePassword(oldPassword, newPassword)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }
}
