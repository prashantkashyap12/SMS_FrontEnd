import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urls } from '../../common/common';

@Injectable({
  providedIn: 'root'
})
export class KharchaService {
  
  private baseUrl = new urls().webApiUrl;
  constructor(private _http:HttpClient) { }
  ngOnInit(){
  }

  GetKharcha(id?:any):Observable<any>{
    return this._http.get(this.baseUrl+"api/SMS_Config/Get_Kharcha?TranId="+id);
  }

  PostKharcha(data:any):Observable<any>{
    return this._http.post(this.baseUrl+"api/SMS_Config/Add_Kharcha", data);
  }

  UpdateKharcha(data:any):Observable<any>{
    return this._http.patch(this.baseUrl+"api/SMS_Config/Patch_Kharcha", data);
  }

  DeleteKharcha(id:any):Observable<any>{
    return this._http.delete(this.baseUrl+"api/SMS_Config/Delete_Kharcha?TranId="+id);
  }

}
