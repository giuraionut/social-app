import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-acc-dialog',
  templateUrl: './delete-acc-dialog.component.html',
  styleUrls: ['./delete-acc-dialog.component.scss'],
})
export class DeleteAccDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteAccDialogComponent>
  ) {}

  ngOnInit(): void {}
  
  action(password: string): void {
    this.dialogRef.close(password);
  }
}
