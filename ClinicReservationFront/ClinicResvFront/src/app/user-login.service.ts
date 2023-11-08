import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  url = "http://127.0.0.1:8000/user"
  constructor(private http: HttpClient) { }
  login(userName : string,password :string): Observable<any>{
    console.log()
    const loginData = {
      username: userName,
      password: password
    };
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json'
    //   })
    // };

    return this.http.post(`${this.url}/login`, loginData);
  }
}

