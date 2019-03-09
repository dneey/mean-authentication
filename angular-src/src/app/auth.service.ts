 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { HttpHeaders } from '@angular/common/http';
 import { JwtHelperService } from '@auth0/angular-jwt';
 import { Response } from '../app/interfaces/response';
import { Observable } from 'rxjs';
import { User } from './interfaces/user';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  // Register User
  registerUser(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
  };


   return <Observable<Response>>this.http.post('http://localhost:3000' + '/users/register', user, httpOptions)
   .pipe();
}

// Login User
authenticateUser(user): Observable<Response>  {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
 return <Observable<Response>> this.http.post('http://localhost:3000' + '/users/authenticate', user, httpOptions)
 .pipe();
}

getProfile() {
  this.loadToken();
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization':  this.authToken,
    })
};
 return <Observable<User>>this.http.get('http://localhost:3000' + '/users/profile', httpOptions)
 .pipe();
}

storeUserData(token, user) {
  localStorage.setItem('id_token', token);
  localStorage.setItem('user', JSON.stringify(user));
  this.authToken = token;
  this.user = user;
}

loadToken() {
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}

loggedIn() {
  this.loadToken();
  return !jwtHelper.isTokenExpired(this.authToken);
}
logout() {
  this.authToken = null;
  this.user = null;
  localStorage.clear();
}


}
