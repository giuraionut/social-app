import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.scss'],
})
export class RegisterItemComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  usernameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
    ),
  ]);

  getErrorMessage(field: string): string {
    switch (field) {
      case 'username': {
        if (this.usernameControl.hasError('required')) {
          return 'Username is mandatory.';
        }
        if (this.usernameControl.hasError('string')) {
          return 'Invalid username.';
        }
        if (this.usernameControl.hasError('minlength')) {
          return 'Min. lenght 5 characters.';
        }
        break;
      }
      case 'email': {
        if (this.emailControl.hasError('required')) {
          return 'Email is mandatory.';
        }
        if (this.emailControl.hasError('email')) {
          return 'Email is invalid.';
        }
        break;
      }
      case 'password': {
        if (this.passwordControl.hasError('required')) {
          return 'Password is mandatory.';
        }
        if (this.passwordControl.hasError('pattern')) {
          return 'At least one capital letter, a special character and minimum 8 characters.';
        }
        break;
      }
    }
    return 'Ok';
  }

  public register(username: string, password: string, email: string) {
    let user: User = { username: username, password: password, email: email };
    this.userService.register(user).subscribe();
  }
}
