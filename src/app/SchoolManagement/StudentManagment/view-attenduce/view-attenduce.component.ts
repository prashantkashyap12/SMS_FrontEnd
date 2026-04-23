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
  }

  TeacherList:any
  allot(){
    this._config.viewTeacher().subscribe((res:any)=>{
      this.TeacherList = res.message;
    })
  }





  onSubmit(a:any){


    let model;

    if(a == 'Student'){
      this.isDayWise = true;
      model = {
      }
      this._stdRec.AttendanceStudentId(model).subscribe((res:any)=>{
        console.log(res);
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
        console.log(res);
      },(err:any)=>{
        alert(err.error)
      })
    }
  }



  //  attenduce data student ka monthly - teacherId, classId, month, StudentId



}
