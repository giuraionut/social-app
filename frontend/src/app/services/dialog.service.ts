import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../items/modal/modal.component';
import { Modal } from '../models/modal.model';

@Injectable()
export class ModalService {
  constructor(public dialog: MatDialog) {}
  private dialogRef: any;
  private modalDetails: Modal = {};
  openDialog(modalDetails: Modal): void {
    this.modalDetails = modalDetails;
    this.dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      autoFocus: false,
      data: { modalDetails: modalDetails },
    });
  }

  getRef(): MatDialogRef<any> {
    return this.dialogRef;
  }

  close(value?: string): void {
    this.modalDetails.payload = value;
    this.dialogRef.close(this.modalDetails);
  }
}
