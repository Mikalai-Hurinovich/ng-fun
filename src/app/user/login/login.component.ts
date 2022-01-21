import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IToastr, TOASTR_TOKEN } from '../../common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isDirty = true;
  userName: string;
  userPassword: number;
  mouseoverLogin: boolean;
  loginInvalid = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    @Inject(TOASTR_TOKEN) private readonly toastr: IToastr) {
  }

  ngOnInit(): void {
  }

  login(formValues): void {
    this.authService.loginUser(formValues.userName, formValues.userPassword)
      .subscribe(res => {
        if (!res) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
          this.toastr.success(`You have successfully login as ${formValues.userName}`);
        }
      });
  }

  handleCancel(): void {
    this.router.navigate(['events']);
  }
}
