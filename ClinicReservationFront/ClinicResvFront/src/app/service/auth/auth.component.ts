import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
@Injectable({
  providedIn:'root'
})
export class AuthComponent {
  constructor(private http:HttpClient) {}
  apiurl= 'http://localhost:4200/'
  
  getAll(){
    return this.http.get(this.apiurl);
  }

  getByCode(code:any){
    return this.http.get(this.apiurl+'/'+code);
  }
  ProceedSignUp(inputdata:any){
    return this.http.post(this.apiurl,inputdata);
  }
  update(code:any,inputdata:any){
    return this.http.put(this.apiurl+ '/'+code, inputdata);
  }
}
