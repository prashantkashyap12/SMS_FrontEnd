import { Injectable } from '@angular/core';
import { urls } from '../../common/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private _http:HttpClient) { }
  private baseUrls = new urls().webApiUrl;
 
 
  // Add class -- OPEN  - Done
  viewClass():Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/ClassList';
    return this._http.get(url);
  }
  addClass(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/CreateClass';
    return this._http.post(url, model);
  }
  delClass(classId:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/DeleteClass?classId='+classId;
    return this._http.delete(url);
  }
  updateClass(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/UpdateClass';
    return this._http.patch(url, model);
  }


  // Add Academic -- OPEN  --  
  viewAcademic():Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/SessionList';
    return this._http.get(url);
  }
  addAcademic(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/CreateSession';
    return this._http.post(url, model);
  }
  delAcademic(SessionId:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/DeleteSession?SessionId='+SessionId;
    return this._http.delete(url);
  }
  updateAcademic(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/UpdateSession';
    return this._http.patch(url, model);
  }

    // Add Section -- OPEN
  viewSection():Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/SectionList';
    return this._http.get(url);
  }
  addSection(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/CreateSection';
    return this._http.post(url, model);
  }
  delSection(SectionId:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/DeleteSection?SectionId='+SectionId;
    return this._http.delete(url);
  }
  updateSection(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/UpdateSection';
    return this._http.patch(url, model);
  }

  // GenClass (Class + Acadmic + Section)
  viewGenClass():Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/ClassGenList';
    return this._http.get(url);
  }
  addGenClass(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/CreateClassGen';
    return this._http.post(url, model);
  }
  delGenClass(GenClassId:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/DeleteClassGen?GenClassId='+GenClassId;
    return this._http.delete(url);
  }
  updateGenClass(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/UpdateClassGen';
    return this._http.patch(url, model);
  }

  // Add Fee
   viewFee():Observable<any>{
    let url = this.baseUrls;
    return this._http.get(url);
  }
  addFee(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
  }
  delFee(FeeId:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.delete(url,FeeId);
  }
  updateFee(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.patch(url, model);
  }

  // Fee Stracture 
  viewFeeStract():Observable<any>{
    let url = this.baseUrls;
    return this._http.get(url);
  }
  addFeeStract(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
  }
  delFeeStract(FeeStractId:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.delete(url,FeeStractId);
  }
  updateFeeStract(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.patch(url, model);
  }


}
