import {Component, OnInit} from '@angular/core';
import {EventService, IEvent} from './shared';
import {ActivatedRoute} from '@angular/router';

@Component({
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr/>
      <div class="row">
        <div class="col-md-4" *ngFor="let event of events">
          <app-event-thumbnail [event]="event"></app-event-thumbnail>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['events-list.component.scss'],
})
export class EventsListComponent implements OnInit {
  events: Array<IEvent>;

  constructor(private readonly eventService: EventService, private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.events = this.route.snapshot.data.events;
  }
}
