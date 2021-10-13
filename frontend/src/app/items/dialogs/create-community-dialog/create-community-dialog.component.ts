import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Community } from '../../../models/community.model';
import { CommunityService } from '../../../services/community.service';
import { DeleteAccDialogComponent } from '../delete-acc-dialog/delete-acc-dialog.component';

@Component({
  selector: 'app-create-community-dialog',
  templateUrl: './create-community-dialog.component.html',
  styleUrls: ['./create-community-dialog.component.scss'],
})
export class CreateCommunityDialogComponent implements OnInit {
  constructor(private communityService: CommunityService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CreateCommunityDialogComponent>) {}

  ngOnInit(): void {}

  public createCommunity(communityTitle: string, communityDescription: string) {
    let community: Community = {};
    community.title = communityTitle;
    community.creationDate = new Date();
    community.description = communityDescription;
    this.communityService.create(community).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
