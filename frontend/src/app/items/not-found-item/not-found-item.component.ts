import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-item',
  templateUrl: './not-found-item.component.html',
  styleUrls: ['./not-found-item.component.scss']
})
export class NotFoundItemComponent implements OnInit {

  constructor() { }

  @Input() entry: string = ''; 
  ngOnInit(): void {
  }

}
