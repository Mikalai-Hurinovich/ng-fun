import { Injectable, Pipe } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService, IEvent } from './shared';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()

export class EventsListResolver implements Resolve<any> {
  constructor(private readonly eventService: EventService) {
  }
  resolve(): Observable<IEvent[]> {
    // make async method here
    // getEvents returns the observable, map gives us access to data stream
    return this.eventService.getEvents().pipe(map(events => events));
  }
}
