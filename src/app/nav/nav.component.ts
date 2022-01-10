import {Component, OnInit} from '@angular/core';
import {AuthService} from '../user/auth.service';
import {EventService, ISession} from '../events';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  searchTerm: string;
  foundSessions: ISession[];

  constructor(public auth: AuthService, private readonly eventService: EventService) {
  }

  handleSearchSessions(searchTerm: string): void {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    });
  }
}
