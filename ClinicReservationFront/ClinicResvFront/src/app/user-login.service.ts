// user-login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  url = "/api";

  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    const loginData = {
      username: userName,
      password: password
    };

    return this.http.post(`${this.url}/login`, loginData);
  }
}
