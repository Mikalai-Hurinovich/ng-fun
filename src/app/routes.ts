import {  Routes  } from '@angular/router';

import {
  CreateEventComponent,
  EventDetailsComponent,
  EventRouteActivator,
  EventsListComponent,
  EventsListResolver,
} from './events/index';

import { Error404Component } from './errors/404.component';


export const appRoutes: Routes = [
  {
    path: 'events/create', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']
  },
  {
    // first activate EventsListResolver, get data and put them in the property "events"
    path: 'events', component: EventsListComponent, resolve: { events: EventsListResolver }
  },
  {
    path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator]
  },
  {
    path: '404', component: Error404Component
  },
  {
    path: '', redirectTo: '/events', pathMatch: 'full'
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module')
      .then(module => module.UserModule) // loads a new module, lazy
  },
];



