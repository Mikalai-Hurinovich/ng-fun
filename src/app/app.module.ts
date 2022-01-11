import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import {
  CreateEventComponent,
  CreateSessionComponent,
  DurationPipe,
  EventDetailsComponent,
  EventRouteActivator,
  EventService,
  EventsListComponent,
  EventsListResolver,
  EventThumbnailComponent,
  LocationValidator,
  SessionListComponent,
  UpvoteComponent,
  VoterService
} from './events';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { CollapsibleWellComponent, IToastr, JQ_TOKEN, ModalTriggerDirective, SimpleModalComponent, TOASTR_TOKEN } from './common';
import { appRoutes } from './routes';
import { Error404Component } from './errors/404.component';
import { UserModule } from './user/user.module';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const toastr: IToastr = window['toastr'];
const jQuery = window['$'];

@NgModule({
    imports: [BrowserModule, UserModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(appRoutes)],
    declarations: [
      AppComponent,
      EventsListComponent,
      CreateEventComponent,
      EventThumbnailComponent,
      UpvoteComponent,
      EventDetailsComponent,
      NavComponent,
      Error404Component,
      CreateSessionComponent,
      SessionListComponent,
      CollapsibleWellComponent,
      DurationPipe,
      LocationValidator,
      SimpleModalComponent,
      ModalTriggerDirective
    ],
    providers: [EventService, VoterService,
      {
        provide: TOASTR_TOKEN,
        useValue: toastr
      }, {
        provide: JQ_TOKEN,
        useValue: jQuery
      },
      EventRouteActivator, EventsListResolver, AuthService,
      {
        provide: 'canDeactivateCreateEvent', useValue: checkDirtyState
      }],
    bootstrap: [AppComponent]
  }
)
export class AppModule {
}

function checkDirtyState(component: CreateEventComponent): boolean {
  if (component.isDirty) {
    return window.confirm('All unsaved data may be lost, do you really want to cancel?');
  }
  return true;
}

