import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorHomePageService {
  private baseUrl = 'http://127.0.0.1:8000/doctor';

  constructor(private http: HttpClient) { }

  createSlot(slotData: any): Observable<any> {
    const url = `${this.baseUrl}/createSlot`;
    return this.http.post(url, slotData);
  }

}
