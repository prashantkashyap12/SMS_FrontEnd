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
    let url = this.baseUrl+''+`api/SMS_Config/Stdt_Get`;
    return this._http.get(url);
   }
    
   AllStudentRecord2(a:any):Observable<any>{
    let url = this.baseUrl+''+`api/SMS_Config/Stdt_Get`;
    return this._http.get(url,a);
   }
   
   // Add Student Record 
    AddStudentComponent(model:any):Observable<any>{
      let url = this.baseUrl+''+`api/SMS_Config/Stdt_Add`;
      return this._http.post(url,model);
    }
   
    // Update Student Record
    UpdateStudentComponent(model:any):Observable<any>{
    let url = this.baseUrl+''+`api/SMS_Config/Stdt_Update`;
    return this._http.patch(url,model);
    }
  
     // Delete Student Record
    DeleteStudentComponent(id:number):Observable<any>{
      let url = this.baseUrl+''+`api/SMS_Config/Stdt_Delete?AdmissionId=${id}`;
      return this._http.delete(url);
    }


    // Attendance Record
    AddAttendanceRecord(model:any):Observable<any>{
      let url = this.baseUrl+''+`api/SMS_Config/SubmitAttendance`;
      return this._http.post(url,model);
    }



   



   
}
