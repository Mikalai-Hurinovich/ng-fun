import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISession } from '../shared';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.scss']
})
export class CreateSessionComponent implements OnInit {
  newSessionForm: FormGroup;
  name: FormControl;
  duration: FormControl;
  level: FormControl;
  presenter: FormControl;
  abstract: FormControl;

  constructor() {
  }

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400)]);

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  handleSaveForm(formValues: ISession): any {
    const session: ISession = {
      id: 65,
      level: formValues.level,
      name: formValues.name,
      duration: +formValues.duration,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    };
    console.log(session);
  }
}
