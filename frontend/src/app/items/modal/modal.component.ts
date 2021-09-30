import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalService } from '../../services/dialog.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  constructor(
    private modal: ModalService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {}
  result: any;
  ngOnInit(): void {}

  onNoClick(): void {
    this.modal.close();
  }

  action(value: string): void {
    this.userService.deleteAccount(value).subscribe();
    this.modal.close(value);
  }
}
