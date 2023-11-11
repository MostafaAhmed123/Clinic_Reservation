// user-login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  url = "http://127.0.0.1:8000/user";

  constructor(private http: HttpClient) { }

  login(userName: string, password: string): Observable<any> {
    const loginData = {
      username: userName,
      password: password
    };

    return this.http.post(`${this.url}/login`, loginData);
  }
}
