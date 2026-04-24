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

  isDayWise = true;
  formChange(a:any){
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
    this.selectTeacerId = a.target.value;
    let teacherId = this.TeacherList.filter((item:any) => item.TeacherId == a.target.value);
    console.log(teacherId);
    let result = this.AllStd.filter((item:any) => item.ClassGenId == teacherId[0].ClassId);
     this.overAllStd = result;
  }

  StudentId:any
  SelectedStd(a:any){
    this.StudentId = a.target.value
  }




  onSubmit(a:any){
    let model;
    if(a == 'Student'){
      this.isDayWise = true;
      model = {
        Date : this.StudentWise.value.StdDate,
        TeacherId : +this.selectTeacerId,
        StdId : this.StudentId
      }
      this._stdRec.AttendanceStudentId(model).subscribe((res:any)=>{
        console.log(res.data);
      },(err:any)=>{
        alert(err)
      })
    }else if(a == 'Teacher'){
      this.isDayWise = false;
      model = {
        TeacherId : +this.TeacherWise.value.TeacherId,
        Date : this.TeacherWise.value.Date
      }
      this._stdRec.AttendanceTeacherId(model).subscribe((res:any)=>{
        console.log(res.data);
      },(err:any)=>{
        alert(err.error)
      })
    }
  }

}
