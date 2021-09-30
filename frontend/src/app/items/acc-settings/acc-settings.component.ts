import { Component, OnInit } from '@angular/core';
import { Modal } from '../../models/modal.model';
import { ModalService } from '../../services/dialog.service';

interface SelectModel {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-acc-settings',
  templateUrl: './acc-settings.component.html',
  styleUrls: ['./acc-settings.component.scss'],
})
export class AccSettingsComponent implements OnInit {
  constructor(private modal: ModalService) {}
  genderValue: string = '';
  countryValue: string = '';

  public country: string = 'Romania';
  public gender: string = 'Male';
  public email: string = 'test@gmail.com';

  modalResult: Modal = {};

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

  openModal(title?: string, subtitle?: string, details?: string) {
    let modalDetails: Modal = {
      title: title,
      subtitle: subtitle,
      details: details,
    };

    this.modal.openDialog(modalDetails);
    let dialogRef = this.modal.getRef();

    dialogRef.afterClosed().subscribe((result: Modal) => {
      if (result.title === 'Email' && result.payload) {
        this.email = result.payload;
      }
    });
  }
}
