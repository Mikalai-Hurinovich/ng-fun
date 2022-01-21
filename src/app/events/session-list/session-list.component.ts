import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ISession } from '../shared';
import { AuthService } from '../../user/auth.service';
import { VoterService } from '../upvote/voter.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss']
})
export class SessionListComponent implements OnChanges {

  @Input() sessions: Array<ISession>;
  @Input() eventId: number;
  @Input() filterBy: string;
  @Input() sortBy: string;
  visibleSessions: ISession[] = [];

// interface OnChanges, будет вызываться каждый раз, когда изменяется значение входных данных (Input())

  constructor(private readonly auth: AuthService, private readonly voterService: VoterService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(this.sortByNameAsc) : this.visibleSessions.sort(this.sortByVotersDesc);
    }
  }

  handleToggleVote(session: ISession): void {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
    } else {
      this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
    }
    if (this.sortBy === 'votes') {
      this.visibleSessions.sort(this.sortByVotersDesc);
    }
  }

  userHasVoted(session: ISession): boolean {
    return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
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
