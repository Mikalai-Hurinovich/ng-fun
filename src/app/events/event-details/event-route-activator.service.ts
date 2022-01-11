import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { EventService } from '../shared';

@Injectable()
export class EventRouteActivator implements CanActivate {
  constructor(private eventService: EventService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot ): boolean {
    const eventExist = !!this.eventService.getEvent(+route.params.id);
    if (!eventExist) {
      this.router.navigate(['404']);

      return eventExist;
    }
    return eventExist;

  }
}

