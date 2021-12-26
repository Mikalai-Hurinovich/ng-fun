import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';

interface ILocation {
  address: string;
  city: string;
  country: string;
}

export interface IEvent {
  id: number;
  name: string;
  date: string;
  time: string;
  price: number;
  imageUrl: string;
  location?: ILocation;
  onlineUrl?: string;
}

@Component({
  selector: 'app-events-list',
  template: `
    <div>
      <h1>Upcoming Angular Events</h1>
      <hr />
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
  events: any;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
  }
}
