import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { UserInfoTokenDecoder } from '../../../services/userInfoTokenDecoder.service';
import { Community } from '../../../models/community.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateCommunityDialogComponent } from '../../dialogs/create-community-dialog/create-community-dialog.component';
import { CommunityService } from '../../../services/community.service';
@Component({
  selector: 'app-navbar-item',
  templateUrl: './navbar-item.component.html',
  styleUrls: ['./navbar-item.component.scss'],
})
export class NavbarItemComponent implements OnInit {
  searchControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  selectedCommunityLabel="Joined communities";
  
  constructor(
    private router: Router,
    private userService: UserService,
    private userInforTokenDecoder: UserInfoTokenDecoder,
    public dialog: MatDialog,
    private communityService: CommunityService
  ) {}

  public authenticatedUser: User = {};

  selectedCommunity: string = '';
  joinedCommunities: Community[] = [];

  ngOnInit(): void {
   
    this.authenticatedUser = this.userInforTokenDecoder.getUserInfoFromToken();
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => (value.length >= 1 ? this._filter(value) : []))
    );
    this.communityService.getJoined(this.authenticatedUser.username!).subscribe((communities) => {
      this.joinedCommunities = communities;
    });
  }

ngOnChanges(): void {

}

  goToCommunity(title: string) {
    this.router.navigate([`socialapp/community/${title}`]);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().startsWith(filterValue)
    );
  }

  public goTo(page: string) {
    this.router.navigate([`socialapp/${page}`]);
  }

  public logout() {
    this.userService.logout().subscribe();
  }

  public openCreateCommunityDialog(): void {
    const dialogRef = this.dialog.open(CreateCommunityDialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
