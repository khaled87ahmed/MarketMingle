import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  Register(data: object) {
    return this.http.post(environment.baseUrl + '/auth/signup', data)
  }

  Login(data: object) {
    return this.http.post(environment.baseUrl + '/auth/signin', data)
  }

  forgotPassword(email: object) {
    return this.http.post(environment.baseUrl + '/auth/forgotPasswords', email)
  }

  verifyResetCode(code: object) {
    return this.http.post(environment.baseUrl + '/auth/verifyResetCode', code)
  }

  resetPassword(data: object) {
    return this.http.put(environment.baseUrl + '/auth/resetPassword', data)
  }

  getLoggedUserAddress() {

    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;

    return this.http.get(environment.baseUrl + '/addresses', { headers } );

  }


  updateLoggedUserPassword(data: object) {

    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;

    return this.http.put(environment.baseUrl + '/users/changeMyPassword', data , { headers } );

  }


  addAddress(data: object) {

    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;

    return this.http.post(environment.baseUrl + '/addresses', data, { headers });

  }


  updateLoggedUserData(data: object) {

    const token = localStorage.getItem('token');

    const headers = token
      ? new HttpHeaders({ 'token': token })
      : undefined;

    return this.http.put(environment.baseUrl + '/users/updateMe', data , { headers } );

  }


}
