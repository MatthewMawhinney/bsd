import { Injectable } from '@angular/core';
import { Http, Headers, Response, HttpModule } from "@angular/http";

import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from "../components/register/User.model";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()
export class RegisterService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred: ', error.error.message);
    } else {
      console.error(`Server returned code ${error.status}, body was : ${error.error} `);
    }
    return throwError('Error Occured.');
  }

  // register a new user with POST method
  registerUser(user: User) {
    // user is the object passed from the authentication.component
    //const body = JSON.stringify(user);
    let headers = new Headers({ 'Content-Type': 'application/json' });

    return this.http
      .post('http://localhost:3000/users/register', user, { headers: headers })
      .pipe(map((response: Response) => response.json()), catchError(this.handleError));

  }

  authenticateUser(user) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http
      .post('http://localhost:3000/users/authenticate', user, { headers: headers })
      .pipe(map((response: Response) => response.json()), catchError(this.handleError));
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}