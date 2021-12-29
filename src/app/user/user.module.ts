import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { userRoutes } from './user-routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [ProfileComponent],
  providers: [
    {
      provide: 'canDeactivateProfile', useValue: checkDirtyState
    }
  ]
})

export class UserModule {
}

function checkDirtyState(component: ProfileComponent): boolean {
  if (component.isDirty) {
    return window.confirm('All unsaved data may be lost, do you really want to cancel?');
  }
  return true;
}
