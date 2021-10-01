import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-card',
  templateUrl: './not-found-card.component.html',
  styleUrls: ['./not-found-card.component.scss']
})
export class NotFoundCardComponent implements OnInit {

  constructor() { }

  @Input() entry: string = ''; 
  ngOnInit(): void {
  }

}
