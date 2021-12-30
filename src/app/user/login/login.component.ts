import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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

  constructor(private readonly authService: AuthService, private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  login(formValues): void {
    this.authService.loginUser(formValues.userName, formValues.password);
    this.router.navigate(['events']);
  }

  handleCancel(): void {
    this.router.navigate(['events']);
  }
}
