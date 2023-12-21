import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorSignUpService {
  private apiUrl = '';

  constructor(private http: HttpClient) {
    this.apiUrl = this.getBaseURL().API_URL;
  }
  getBaseURL(): Observable<any>{
    return this.http.get<any>('../assets/cofig.json');
  }

  addDoctor(doctor: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addDoctor`, doctor);
  }
}
