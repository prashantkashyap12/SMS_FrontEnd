import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urls } from '../../common/common';

@Injectable({
  providedIn: 'root'
})
export class StdManagService {

  constructor(private _http: HttpClient) {}

  baseUrl:string = new urls().webApiUrl;

  AddStudentComponent(model:any):Observable<any>{
    return this._http.post(this.baseUrl,model);
   }

   



   
}
