import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  constructor(private router: Router) {}

  @Input() post: Post = {};

  ngOnInit(): void {}

  public goTo() {
    this.router.navigate([`/socialapp/post/${this.post.id}`]);
  }
}
