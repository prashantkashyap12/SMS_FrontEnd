import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { urls } from '../../common/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeeManagerService {

  constructor(private _http:HttpClient) { }

  baseUrl = new urls().webApiUrl;
  
  // Get Recipit
  getRecipit(): Observable<any> {
    let url = this.baseUrl+'api/SMS_Config/ReciptRec';
    return this._http.get(url);
  }

  // Get Fee Structure
  getFeeStructure(AdmissionId:any): Observable<any> {
    let url = this.baseUrl+'api/SMS_Config/FeeCollecitonGet2';
    return this._http.get(url, AdmissionId);
  }

  FeeCollection(model:any): Observable<any> {
    let url = this.baseUrl+'api/SMS_Config/FeeCollection';
    return this._http.post(url, model);
  }


}
