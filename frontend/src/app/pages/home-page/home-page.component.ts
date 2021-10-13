import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  public posts: Post[] = [];
  public communities = false;
  public nrOfCols = 4;
  ngOnInit(): void {
    
    //--------------------------------------------------------------------------------------------------------------
  }
}
