import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-delete-acc-dialog',
  templateUrl: './delete-acc-dialog.component.html',
  styleUrls: ['./delete-acc-dialog.component.scss'],
})
export class DeleteAccDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteAccDialogComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  deleteAcc(password: string): void {
    this.userService.deleteAccount(password).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
