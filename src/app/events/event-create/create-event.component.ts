import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})


export class CreateEventComponent {
  isDirty = true;

  constructor(private router: Router) {
  }

  handleCancelButtonClick(): void {
    this.router.navigate(['/events']);
  }
}
