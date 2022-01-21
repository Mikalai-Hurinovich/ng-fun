import { Routes } from '@angular/router';

import {
  CreateEventComponent,
  CreateSessionComponent,
  EventDetailsComponent,
  EventsListComponent,
  EventsListResolver,
  EventResolver
} from './events';

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
    path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver }
  },
  {
    path: 'events/session/new', component: CreateSessionComponent
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
  }
];



