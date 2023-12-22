// patient-sign-up.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environment/environment'

@Injectable({
  providedIn: 'root'
})
export class PatientSignUpService {
  url = environment.BACKEND_URL;

  constructor(private http: HttpClient) {}

  addPatient(patient: any): Observable<any> {
    return this.http.post(`${this.url}/api/patient/addPatient`, patient);
  }
}