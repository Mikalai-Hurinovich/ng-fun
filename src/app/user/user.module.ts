import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { userRoutes } from './user-routes';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [ProfileComponent, LoginComponent],
  providers: []
})

export class UserModule {
}
