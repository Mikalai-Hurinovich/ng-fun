import { Injectable } from '@angular/core';
import { IUser } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class AuthService {
  currentUser: IUser;

  constructor(private readonly http: HttpClient) {
  }

  loginUser(userName: string, userPassword: string): Observable<boolean | object> {
    const loginInfo = { username: userName, password: userPassword };
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        // @ts-ignore
        this.currentUser = data.user as IUser;
      }))
      .pipe(catchError(() => {
        return of(false);
      }));
  }


  logoutUser(): Observable<object> {
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post('/api/logout', {}, options);
  }

  updateCurrentUser(firstName, lastName): Observable<object> {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  checkAuthStatus(): void {
    this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = data as IUser;
        }
      }))
      .subscribe();
  }


  isAuth(): boolean {
    return !!this.currentUser;
  }
}
