import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { JQ_TOKEN } from '../jQuery.service';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent {

  @Input() title: string;
  @Input() elementId: string;
  @Input() isCloseOnBodyClick: string;
  @ViewChild('modalcontainer') containerEl: ElementRef;

  constructor(@Inject(JQ_TOKEN) private readonly $: any) {
  }

  handleCloseModal(): void {
    if (this.isCloseOnBodyClick) {
      this.$(this.containerEl.nativeElement).modal('hide');
    }
  }
}
