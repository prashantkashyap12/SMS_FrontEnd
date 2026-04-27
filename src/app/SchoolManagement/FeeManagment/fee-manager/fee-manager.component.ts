import { Component } from '@angular/core';
import { FeeManagerService } from '../fee-manager.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from '../../Configrations/config.service';
import { StdManagService } from '../../StudentManagment/std-manag.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-fee-manager',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [FeeManagerService, StdManagService, ConfigService],
  templateUrl: './fee-manager.component.html',
  styleUrl: './fee-manager.component.css'
})
export class FeeManagerComponent {


  constructor(private _feeManager:FeeManagerService, private _studentManager:StdManagService, private _cofigService:ConfigService) { }
  ngOnInit(): void {
    this.Allot();
  }

  teacherList:any = [];
  StudentCollection:any = [];
  FeeCollection:any;

  Allot(){
    this._cofigService.viewTeacher().subscribe((res:any)=>{
      this.teacherList = res.message;
      console.log(this.teacherList);
    })
    this._studentManager.AllStudentRecord().subscribe((res:any)=>{
      this.StudentCollection = res.data;
      console.log(this.StudentCollection);
    })
    this._feeManager.getFeeStructure().subscribe(res=>{
      this.FeeCollection = res.data;
    })
  }

  StudentCollection2:any = [];
  TeacherChange(a:any){
    let id = a.target.value;
    this.StudentCollection2 = this.StudentCollection.filter((a:any)=>a.ClassGenId==id);
  }
  studentName:any;
  FeeCollection2:any;

  StudentsChange(a:any){
    let id = a.target.value;
    this.studentName = this.StudentCollection.filter((a:any)=>a.AdmissionId==id);
    this.FeeCollection2 = this.FeeCollection.filter((a:any)=>a.StudTran==id);
    console.log(this.FeeCollection2);
  }
}
