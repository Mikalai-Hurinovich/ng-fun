import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEvent } from './events-list.component';

@Component({
  selector: 'app-event-thumbnail',
  template: `
    <div class="well hoverwell thumbnail ">
      <h2>{{ event?.name }}</h2>
      <div>Date: {{ event?.date }}</div>
      <div [ngSwitch]="event?.time">
        Time: {{ event?.time }}
        <span [ngClass]="getStartTimeClass()" *ngSwitchCase="'8:00 am'"
          >(Early Start)</span
        >
        <span [ngClass]="getStartTimeClass()" *ngSwitchCase="'10:00 am'"
          >(Late Start)</span
        >
        <span [ngClass]="getStartTimeClass()" *ngSwitchDefault
          >(Normal Start)</span
        >
      </div>
      <div>Price: \${{ event?.price }}</div>
      <div *ngIf="event?.location">
        <span>Location: {{ event?.location?.address }}</span>
        <span class="pad-left">
          {{ event?.location?.city }},
          {{ event?.location?.country }}
        </span>
      </div>
      <div *ngIf="event?.onlineUrl">Url Address: {{ event?.onlineUrl }}</div>
    </div>
  `,
  styleUrls: ['./events-list.component.scss'],
})
export class EventThumbnailComponent {
  @Input() event: IEvent;

  getStartTimeClass(): Array<string> {
    const earlyStart = this.event && this.event.time === '8:00 am';
    const lateStart = this.event && this.event.time === '10:00 am';
    if (earlyStart) {
      return ['green', 'bold'];
    } else if (lateStart) {
      return ['red', 'bold'];
    } else {
      return ['gray', 'bold'];
    }
  }
}
