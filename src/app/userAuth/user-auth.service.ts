import { Injectable } from '@angular/core';
import { urls } from '../common/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private baseUrl = new urls().webApiUrl;
  constructor(private _http:HttpClient) { }

  // userSignup
  signup(model:any):Observable<any>{
    let url = this.baseUrl+'signup';
    return this._http.post(url,model);
  }

  // user verify
  varify(model:any):Observable<any>{
    let url = this.baseUrl+"ForgetGen2";
    return this._http.post(url, model)
  }

  // user signin
  signIn(model:any):Observable<any>{
    let url = this.baseUrl+"Signin";
    return this._http.post(url, model);
  }

  // user forget
  forget(model:any):Observable<any>{
    let url = this.baseUrl+"ForgetReq";
    return this._http.post(url, model);
  }



}
