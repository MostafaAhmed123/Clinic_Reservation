// patient-sign-up.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientSignUpService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.getBaseURL().subscribe((url: string) => {
      this.apiUrl = url;
    });
  }
  getBaseURL(): Observable<string>{
    return this.http.get<any>('../assets/cofig.json').pipe(
      map(config => config.API_URL)
    );
  }

  addPatient(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPatient`, patient);
  }
}
