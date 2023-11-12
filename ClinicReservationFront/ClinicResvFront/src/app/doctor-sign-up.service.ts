import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorSignUpService {
  private apiUrl = 'http://127.0.0.1:8000/doctor'; 

  constructor(private http: HttpClient) {}

  addDoctor(doctor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addDoctor`, doctor);
  }
}
