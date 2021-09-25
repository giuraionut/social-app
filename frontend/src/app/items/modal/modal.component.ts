import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../../services/dialog.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    private modal: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  result: any;
  ngOnInit(): void {}

  onNoClick(): void {
    this.modal.close();
  }

  action(value: string): void {
    this.modal.close(value);
  }
}
