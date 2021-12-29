import { Component } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent  {
  isDirty = true;

  constructor(private readonly router: Router) {
  }

  handleCancelButtonClick(): void {
    this.router.navigate(['/events']);
  }
}
