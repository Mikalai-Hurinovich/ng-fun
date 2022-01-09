import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {IToastr, TOASTR_TOKEN} from '../../common/toastr.service';

// import { ToastrService } from '../../common/toastr.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isDirty = true;

  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(private readonly router: Router, private readonly authService: AuthService,
              @Inject(TOASTR_TOKEN) private readonly toastr: IToastr) {
  }

  ngOnInit(): void {
    // create formControl to each input
    // initial value firstName for Form, validator for form (name must start with a character)
    this.firstName = new FormControl(this.authService.currentUser.firstName, {
      validators: [Validators.required, Validators.pattern('[a-zA-Z].*')],
      updateOn: 'blur'
    });
    // initial value lastName for Form, validator for form
    this.lastName = new FormControl(this.authService.currentUser.lastName, {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    // add controls to a form
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName
    });
  }

  handleCancelButtonClick(): void {
    this.router.navigate(['/events']);
  }

  handleSaveProfile(values: any): void {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(values.firstName, values.lastName);
      this.toastr.success('You profile has successfully updated');
    }
  }

  validateFirstName(): boolean {
    return this.firstName.valid || this.firstName.untouched;
  }

  validateLastName(): boolean {
    return this.lastName.valid || this.lastName.untouched;
  }
}
