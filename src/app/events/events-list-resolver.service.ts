import { Injectable, Pipe } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from './shared/event.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IEvent } from './shared';


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
