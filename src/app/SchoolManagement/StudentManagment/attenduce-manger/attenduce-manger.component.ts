import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfigService } from '../../Configrations/config.service';
import { StdManagService } from '../std-manag.service';
import moment from 'moment';
@Component({
  selector: 'app-attenduce-manger',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ConfigService, StdManagService],
  templateUrl: './attenduce-manger.component.html',
  styleUrl: './attenduce-manger.component.css'
})
export class AttenduceMangerComponent {
  teacherList:any;
  techerData:any[]=[];
  StudnetList:any[]=[];
  selectedClass:any;
  
  // Form Controls
  isAbsent = false ;
  attendanceForm!:FormGroup;
  ClassGenId:any;
  TeacherId:any;
  
  constructor(private _config:ConfigService, private _stdRec:StdManagService, private _fb:FormBuilder){} 
    ngOnInit(){
      this.allot()
    }

    // Allot Teacher to Class
    allot(){
      this._config.viewTeacher().subscribe((res:any)=>{
        this.teacherList = res.message;
      })
    }
    onTeacherChange(event:any){
      console.log(event);
      let classId = Number(event.target.value);
     
      this.techerData = this.teacherList.filter((item:any) => item.ClassId === classId);
      this.ClassGenId = this.techerData[0].ClassId;
      this.TeacherId = this.techerData[0].TeacherId;
      this._stdRec.AllStudentRecord().subscribe((res:any)=>{
       let result = res.data;
       this.StudnetList = result.filter((item:any) => item.ClassGenId === classId);    
       this.Init()
      })
      this._config.viewGenClass().subscribe((res:any)=>{
      let genClass = res.data;
      let selectedClass = genClass.filter((item:any) => item.GenClassKey === classId);
      this.filterbyClassId(selectedClass[0].ClassId);
      })
    }

    filterbyClassId(classId:any){
      this._config.viewClass().subscribe((res:any)=>{
        let classData = res.data;
        let selectedClass = classData.filter((item:any) => item.ClassId === classId);
        this.selectedClass = selectedClass[0].ClassName;
      })
    }


    // Form CRED

    Init(){
      this.attendanceForm = this._fb.group({
        ClassGenId: [this.ClassGenId],
        TeacherId: [this.TeacherId],
        CurrentDate: [moment(new Date()).format('YYYY-MM-DD')],
        students: this._fb.array(this.StudnetList.map(s => this._fb.group({
          AdmissionId: [s.AdmissionId],
          StatusA: [''],
          Note: ['']    
        })))
      })
    }


    submitAttendance(){
      if(!this.attendanceForm.valid){
        return;
      }
      const val = this.attendanceForm.value;
      const model = {
        AttendanceId: 0,
        ClassGenId: val.ClassGenId ?? 0,
        TeacherId: val.TeacherId ?? 0,
        CurrentDate: val.CurrentDate ?? moment().format('YYYY-MM-DD'),
        Students: val.students.map((s:any) => ({
          AdmissionId: s.AdmissionId ?? 0,
          StatusA: s.StatusA ?? '',
          Note: s.Note ?? '-'
        }))
      };
      this._stdRec.AddAttendanceRecord(model).subscribe((res:any)=>{
        alert(res.message);
      })
    }
    
}
