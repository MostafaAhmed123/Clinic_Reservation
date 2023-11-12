// patient-sign-up.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientSignUpService {
  private apiUrl = 'http://127.0.0.1:8000/patient';

  constructor(private http: HttpClient) {}

  addPatient(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPatient`, patient);
  }
}