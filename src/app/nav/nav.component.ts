import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { EventService, IEvent, ISession } from '../events';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as events from 'events';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();

  searchTerm: string;

  foundSessions: ISession[];

  events: IEvent[];

  constructor(
    public auth: AuthService,
    private readonly eventService: EventService,
    private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.eventService.getEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.events = data;
        console.log(this.events);
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleSearchSessions(searchTerm: string): void {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    });
  }
}
