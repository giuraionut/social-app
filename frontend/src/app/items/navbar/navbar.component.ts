import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { UserInfoTokenDecoder } from '../../services/userInfoTokenDecoder.service';
import { Community } from '../../models/community.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateCommunityDialogComponent } from '../dialogs/create-community-dialog/create-community-dialog.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  constructor(
    private router: Router,
    private userService: UserService,
    private userInforTokenDecoder: UserInfoTokenDecoder,
    public dialog: MatDialog
  ) {}

  public authenticatedUser: User = {};

  ngOnInit(): void {
    this.authenticatedUser = this.userInforTokenDecoder.getUserInfoFromToken();
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => (value.length >= 1 ? this._filter(value) : []))
    );
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

  selectedCommunity: string = '';
  communities: Community[] = [
    { title: 'Jokes', avatar: 'blabla' },
    { title: 'Music', avatar: 'blabla' },
    { title: 'Movies', avatar: 'blabla' },
  ];
}
