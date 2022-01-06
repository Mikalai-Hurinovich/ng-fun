import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../shared';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnChanges {

  @Input() sessions: Array<ISession>;
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: ISession[] = [];

// interface OnChanges, будет вызываться каждый раз, когда изменяется значение входных данных (Input())

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(this.sortByNameAsc) : this.visibleSessions.sort(this.sortByVotersDesc);
    }
  }

  sortByNameAsc(a: ISession, b: ISession): number {
    if (a.name > b.name) {
      return 1;
    } else if (a.name === b.name) {
      return 0;
    } else {
      return -1;
    }
  }

  sortByVotersDesc(a: ISession, b: ISession): number {
   return b.voters.length - a.voters.length;
  }

  private filterSessions(filter: string): void {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0); // make a duplicate with slice
    } else {
      this.visibleSessions = this.sessions.filter(el => el.level.toLocaleLowerCase() === filter);
    }

  }
}
