import { Component, Inject, OnInit } from '@angular/core';
import { EventService, IEvent, ISession } from '../shared';
import { ActivatedRoute, Params } from '@angular/router';
import { IToastr, TOASTR_TOKEN } from '../../common';

@Component({
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})

export class EventDetailsComponent implements OnInit {

  event: IEvent;
  addMode: boolean;
  filterBy = 'all';
  sortBy = 'name';

  constructor(private eventService: EventService, private route: ActivatedRoute,  @Inject(TOASTR_TOKEN) private readonly toastr: IToastr) {
  }

  ngOnInit(): void {
    this.route.data.forEach((data) => {
        this.event = data.event;
        this.addMode = false;
    });
  }

  addSession(): void {
    this.addMode = true;
  }

  saveNewSession(session: ISession): void {
    const nextId = Math.max(...this.event.sessions.map(s => s.id));
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe({
      next: () => {
        this.addMode = false;
        this.toastr.success('Event was created');
      },
      error: () => {
        this.toastr.error('Something go wrong was created');

      }
    });
  }

  cancelAddSession(): void {
    this.addMode = false;
  }
}
