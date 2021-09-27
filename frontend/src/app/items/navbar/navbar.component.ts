import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  searchControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

  constructor(private router: Router, private userService: UserService) {}

  public authenticatedUser: User = {};

  ngOnInit(): void {
    this.getAuthenticatedUserDetails();
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

  private getAuthenticatedUserDetails() {
    this.userService.getAuthenticated().subscribe((authenticatedUser: User) => {
      this.authenticatedUser = authenticatedUser;
    });
  }
}
