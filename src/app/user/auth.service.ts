import { Injectable } from '@angular/core';
import { IUser } from './user.model';


@Injectable()
export class AuthService {
  currentUser: IUser;

  loginUser(userName: string, password: string): void {
    this.currentUser = {
      id: 1,
      firstName: 'Mikola',
      lastName: 'Hury',
      userName: 'Mikola'
    };
  }

  updateCurrentUser(firstName, lastName): void {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

  isAuth(): boolean {
    return !!this.currentUser;
  }
}
