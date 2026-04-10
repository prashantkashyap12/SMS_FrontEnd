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
 
 
  // Add class -- OPEN  - DONE
  viewClass():Observable<any>{
    let url = this.baseUrls;
    return this._http.get(url);
  }
  addClass(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
  }
  delClass(classId:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.delete(url,classId);
  }
  updateClass(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
  }
  // Add Academic -- OPEN  --  DONE
  viewAcademic():Observable<any>{
    let url = this.baseUrls;
    return this._http.get(url);
  }
  addAcademic(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
  }
  delAcademic(AcademicId:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.delete(url,AcademicId);
  }
  updateAcademic(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
  }

    // Add Section -- OPEN
  viewSection():Observable<any>{
    let url = this.baseUrls;
    return this._http.get(url);
  }
  addSection(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
  }
  delSection(SectionId:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.delete(url,SectionId);
  }
  updateSection(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
  }

  // GenClass (Class + Acadmic + Section)
  viewGenClass():Observable<any>{
    let url = this.baseUrls;
    return this._http.get(url);
  }
  addGenClass(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
  }
  delGenClass(GenClassId:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.delete(url,GenClassId);
  }
  updateGenClass(model:any):Observable<any>{
    let url = this.baseUrls;
    return this._http.post(url, model);
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
    return this._http.post(url, model);
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
    return this._http.post(url, model);
  }


}
