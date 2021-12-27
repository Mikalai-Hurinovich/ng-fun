import { Component, Input} from '@angular/core';
import { IEvent } from '../events-list.component';

@Component({
  selector: 'app-event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['../events-list.component.scss'],
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
