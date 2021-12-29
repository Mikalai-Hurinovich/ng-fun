import { Injectable, Pipe } from '@angular/core';
import { Resolve } from '@angular/router';
import { EventService } from './shared/event.service';
import { map } from 'rxjs/operators';


@Injectable()

export class EventsListResolver implements Resolve<any> {
  constructor(private readonly eventService: EventService) {
  }
  resolve(): Pipe {
    // make async method here
    // getEvents returns the observable, map gives us access to data stream
    return this.eventService.getEvents().pipe(map(events => events));
  }
}
