import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EventService, IEvent } from './shared';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<any>{

  constructor(private readonly eventService: EventService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IEvent> {
    return this.eventService.getEvent(route.params.id);
  }
}
