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

    // View All Student Record
   AllStudentRecord():Observable<any>{
    let url = this.baseUrl+''+`api/SMS_Student/GetAllStudent`;
    return this._http.get(url);
   }
   
    GetStudentById(id:number):Observable<any>{
      let url = this.baseUrl+''+`api/SMS_Student/GetStudentById/${id}`;
      return this._http.get(url);
    }

    // Add Student Record
    AddStudentComponent(model:any):Observable<any>{
      let url = this.baseUrl+''+`api/SMS_Student/CreateStudent`;
      return this._http.post(url,model);
    }


    // Update Student Record
    UpdateStudentComponent(model:any):Observable<any>{
      let url = this.baseUrl+''+`api/SMS_Student/UpdateStudent`;
      return this._http.put(url,model);
     }
    
     // Delete Student Record
      DeleteStudentComponent(id:number):Observable<any>{
        let url = this.baseUrl+''+`api/SMS_Student/DeleteStudent/${id}`;
        return this._http.delete(url);
      }



   



   
}
