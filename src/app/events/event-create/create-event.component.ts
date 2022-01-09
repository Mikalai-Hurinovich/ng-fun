import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {EventService, IEvent} from '../shared';
import {IToastr, TOASTR_TOKEN} from '../../common/toastr.service';

@Component({
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})


export class CreateEventComponent {
  isDirty = true;

  newEvent?: any;

  constructor(private readonly router: Router, private readonly eventService: EventService,
              @Inject(TOASTR_TOKEN) private readonly toastr: IToastr) {
  }

  handleCancelButtonClick(): void {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues: IEvent): void {
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.toastr.success('Event was created');
    this.router.navigate(['/events']);
  }
}
