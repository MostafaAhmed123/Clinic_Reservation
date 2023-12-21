// user-login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private url = '';

  constructor(private http: HttpClient) {
    this.getBaseURL().subscribe((url: string) => {
      this.url = url;
    });
  }
  getBaseURL(): Observable<string>{
    return this.http.get<any>('../assets/cofig.json').pipe(
      map(config => config.API_URL)
    );
  }

  login(userName: string, password: string): Observable<any> {
    const loginData = {
      username: userName,
      password: password
    };

    return this.http.post(`${this.url}/login`, loginData);
  }
}
