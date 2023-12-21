// patient-sign-up.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientSignUpService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = this.getBaseURL();
  }
  getBaseURL(): Observable<string>{
    return this.http.get<any>('../assets/cofig.json');
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPatient`, patient);
  }
}
