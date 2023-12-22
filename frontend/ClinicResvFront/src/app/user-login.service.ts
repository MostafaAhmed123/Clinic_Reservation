// user-login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environment/environment'
@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  url = environment.BACKEND_URL;

  constructor(private http: HttpClient) {
    console.log("Backend BaseURL: ", this.url);
  }

  login(userName: string, password: string): Observable<any> {
    const loginData = {
      username: userName,
      password: password
    };

    return this.http.post(`${this.url}/api/user/login`, loginData);
  }
}
