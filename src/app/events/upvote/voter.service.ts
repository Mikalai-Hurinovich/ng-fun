import { Injectable } from '@angular/core';
import { ISession } from '../shared';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of, Subscription } from 'rxjs';


@Injectable()
export class VoterService {

  constructor(private readonly http: HttpClient) {
  }

  deleteVoter(eventId: number, session: ISession, voterName: string): Subscription {
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError('deleteVoter')))
      .subscribe();
    // session.voters = session.voters.filter(voter => voter !== voterName);
  }

  addVoter(eventId: number, session: ISession, voterName: string): Subscription {
    session.voters.push(voterName);
    const options = { headers: new HttpHeaders({ 'Content-Type': '/application/json' }) };
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    return this.http.post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  userHasVoted(session: ISession, voterName: string): boolean {
    return session.voters.some((voter => voter === voterName));
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: string): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
