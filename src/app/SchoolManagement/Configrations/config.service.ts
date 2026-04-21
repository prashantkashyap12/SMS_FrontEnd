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

  // GenClass (Class + Acadmic + Section) -- done
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

  // Add Fee  --  done
   viewFee():Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/FeeTypeList';
    return this._http.get(url);
  }
  addFee(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/CreateFeeType';
    return this._http.post(url, model);
  }
  delFee(FeeId:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/DeleteFeeType?FeeId='+FeeId;
    return this._http.delete(url);
  }
  updateFee(model:any):Observable<any>{
    let url = this.baseUrls+'api/SMS_Config/UpdateFeeType';
    return this._http.patch(url, model);
  }

  // Fee Stracture -- done
  viewFeeStract():Observable<any>{
    let url = this.baseUrls+''+`api/SMS_Config/FeeStractureList`;
    return this._http.get(url);
  }
  addFeeStract(model:any):Observable<any>{
    let url = this.baseUrls+''+`api/SMS_Config/CreateFeeStracture`;
    return this._http.post(url, model);
  }
  delFeeStract(FeeStractureId:any):Observable<any>{
    let url = this.baseUrls+''+`api/SMS_Config/DeleteFeeStracture`;
    return this._http.delete(url+'?FeeStractureId='+FeeStractureId);
  }
  updateFeeStract(model:any):Observable<any>{
    let url = this.baseUrls+''+`api/SMS_Config/UpdateFeeStracture`;
    return this._http.patch(url, model);
  }

  // Add Teacher -- OPEN
  AddTeacher(model:any):Observable<any>{
    let url = this.baseUrls+''+`api/SMS_Config/CreateTeacher`;
    return this._http.post(url, model);
   }
  viewTeacher():Observable<any>{ 
    let url = this.baseUrls+''+`api/SMS_Config/TeacherList`;
    return this._http.get(url);
  }
  updateTeacher(model:any):Observable<any>{
    let url = this.baseUrls+''+`api/SMS_Config/UpdateTeacher`;
    return this._http.patch(url, model);
  }
  delTeacher(TeacherId:any):Observable<any>{
    let url = this.baseUrls+''+`api/SMS_Config/TeacherDelete?TeacherId =${TeacherId}`;
    return this._http.delete(url);
  }
  // Add Teacher -- CLOSE



}
