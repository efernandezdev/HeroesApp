import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {tap} from 'rxjs';

import { LoginForm } from '../interfaces/login-form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL: string = 'http://challenge-react.alkemy.org/';

  constructor(private http: HttpClient) {}

  login(formAuth: LoginForm) {
    return this.http.post(this.URL, formAuth).pipe(
    tap((res:any)=>{
    localStorage.setItem('token', res.token)
    })
    );
  }

  LoggedIn(){
  return !!localStorage.getItem('token')
  }

  logout(){
  localStorage.removeItem('token')
  }
}
