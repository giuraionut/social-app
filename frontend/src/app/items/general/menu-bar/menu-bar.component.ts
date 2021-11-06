import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Community } from '../../../models/community.model';
import { CreatePostDialogComponent } from '../../dialogs/create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @Input() community?: Community = {};
  ngOnInit(): void {
  }
  @ViewChild('input') input: any; 
  openCreatePostDialog()
  {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      width: '700px',
      data: {community: this.community},
    });
    dialogRef.afterClosed().subscribe(()=> {
      this.input.nativeElement.blur();
    });
  }
}
