import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, model } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../../Configrations/config.service';
import { StdManagService } from '../std-manag.service';

@Component({
  selector: 'app-view-attenduce',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [ConfigService, StdManagService],
  templateUrl: './view-attenduce.component.html',
  styleUrl: './view-attenduce.component.css'
})
export class ViewAttenduceComponent {
  studentWise:any;
  teacherWise:any;
  isDayWise = true;
  formChange(a:any){
    this.DataReponse = [];
    if(a == 'Month'){
      this.isDayWise = true;
    }else if(a == 'Day'){
      this.isDayWise = false;
    }
  }


  //  attencduce data class ka daily - TeacherId, Date
  TeacherWise!:FormGroup;
  StudentWise!:FormGroup;
  constructor(private _config:ConfigService, private _Fb:FormBuilder, private _stdRec:StdManagService){}
  ngOnInit(){
    this.Init();
    this.allot();
  }

  Init(){
    this.TeacherWise = this._Fb.group({
      Date: [''],
      TeacherId: [0]
    })
    this.StudentWise = this._Fb.group({
      StdDate: [''],
      TeacherId: [0],
      StdId: [0]
    })
  }

  TeacherList:any;
  AllStd:any;
  allot(){
    this._config.viewTeacher().subscribe((res:any)=>{
      this.TeacherList = res.message;
    })
    this._stdRec.AllStudentRecord().subscribe((res:any)=>{
      this.AllStd = res.data;
    })
  }

  overAllStd:any
  selectTeacerId:any

  SelectedTeacher(a:any){
    this.overAllStd = [];
    this.DataReponse = [];
    this.selectTeacerId = this.TeacherList.filter((item:any) => item.TeacherId == a.target.value);
    let result = this.AllStd.filter((item:any) => item.ClassGenId == this.selectTeacerId[0].ClassId);
     this.overAllStd = result;
     console.log(this.overAllStd);
  }

  StudentId:any
  SelectedStd(a:any){
    this.StudentId = a.target.value
  }




  DataReponse:any
  onSubmit(a:any){
    let model;
    if(a == 'Student'){
      this.DataReponse = [];
      this.isDayWise = true;
      model = {
        Date : this.StudentWise.value.StdDate,
        TeacherId : this.selectTeacerId[0].TeacherId,
        StdId : this.StudentId
      }
      this._stdRec.AttendanceStudentId(model).subscribe((res:any)=>{


        let resp = res.data;
        resp.forEach((item:any) => {
          this.DataReponse.push({
            CurrentDate:item.CurrentDate,
            StudentName:this.overAllStd.find((a:any)=>a.AdmissionId == item.AdmissionId),
            FatherName:this.overAllStd.find((a:any)=>a.AdmissionId == item.AdmissionId),
            StatusA:item.StatusA,
            Note:item.Note
          })
        })

        console.log(this.DataReponse);


      },(err:any)=>{
        alert(err)
      })
    }else if(a == 'Teacher'){
      this.isDayWise = false;
      model = {
        TeacherId : +this.TeacherWise.value.TeacherId,
        Date : this.TeacherWise.value.Date
      }
      this.DataReponse = [];
      this._stdRec.AttendanceTeacherId(model).subscribe((res:any)=>{
        let resp = res.data;
        resp.forEach((item:any) => {
          this.DataReponse.push({
            CurrentDate:item.CurrentDate,
            StudentName:this.overAllStd.find((a:any)=>a.AdmissionId == item.AdmissionId),
            FatherName:this.overAllStd.find((a:any)=>a.AdmissionId == item.AdmissionId),
            StatusA:item.StatusA,
            Note:item.Note
          })
        })
      },(err:any)=>{
        alert(err.error)
      })
    }
  }

}
