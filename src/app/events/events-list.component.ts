import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared';

@Component({
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr />
      <div class="row">
        <div class="col-md-4" *ngFor="let event of events">
          <app-event-thumbnail [event]="event" (click)="handleThumbnailClick(event.name)"></app-event-thumbnail>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  events: Array<IEvent>;

  constructor(private readonly eventService: EventService, private readonly toastr: ToastrService,
              private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.events = this.route.snapshot.data.events;
  }


  handleThumbnailClick(name): void {
    this.toastr.success(name);
  }
}
