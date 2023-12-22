import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class DoctorSignUpService {
  url = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  addDoctor(doctor: any): Observable<any> {
    return this.http.post(`${this.url}/api/doctor/addDoctor`, doctor);
  }
}
