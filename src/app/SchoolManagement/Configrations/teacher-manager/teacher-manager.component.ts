import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, model } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ConfigService } from '../config.service';
import { ClassData } from './class-data';

@Component({
  selector: 'app-teacher-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
  providers: [ConfigService],
  templateUrl: './teacher-manager.component.html',
  styleUrl: './teacher-manager.component.css'
})
export class TeacherManagerComponent {

  data:any[] = [];
  ClassLsdata:any;
  keyboard:any='Name';
  TeacherForm!:FormGroup;
  isButton:boolean = true;

  ngOnInit(){
    this.Init();
    this.allot();
    this.isButton = true;
  }
  constructor(private _fb:FormBuilder, private _configService:ConfigService){}

  Init(){
    this.TeacherForm = this._fb.group({
      Name:[''],
      Contact:[''],  
      UID:[''],
      JoiningDate:[''],
      ClassId:[0],
      SubjectTeacher:[''],
      Remark:[''],
      Salary:[0]
    })
  }

  TeacherId:any;
  selectEvent(a:any){
    this.TeacherForm.patchValue({
      TeacherId: a.TeacherId,
      Name: a.Name,
      Contact: a.Contact,
      UID: a.UID,
      JoiningDate: a.JoiningDate,
      ClassId: a.ClassId,
      SubjectTeacher: a.SubjectTeacher,
      Remark: a.Remark,
      Salary: a.Salary
    })
    this.isButton = false;  
    this.TeacherId = a.TeacherId;
  }
  onChangeSearch(a:any){}
  onFocused(a:any){}

  allot(){
    this.isButton = true;
    this._configService.viewGenClass().subscribe((res:any)=>{
      this.ClassLsdata = res.data;
    })
    this._configService.viewTeacher().subscribe((res:any)=>{
      this.data = res.message;
      this.ConvertNew();  
    })
  }

   // new Object formating
    ConvertNew(){
      let data = (this.ClassLsdata as ClassData[]).map(({GenClassKey, ...rest})=>{
      return {
        ClassId2 : GenClassKey,
        ...rest
      }
    })

    console.log(data);
    console.log(this.ClassLsdata);
    console.log(this.data);
    }

  onSubmit(){
      if(!this.TeacherForm.valid){
        return;
      }
      let model = {
        TeacherId: this.TeacherId??0,
        Name: this.TeacherForm.value.Name,
        Contact: this.TeacherForm.value.Contact,
        UID: this.TeacherForm.value.UID,
        JoiningDate: this.TeacherForm.value.JoiningDate,
        ClassId: Number(this.TeacherForm.value.ClassId),
        SubjectTeacher: this.TeacherForm.value.SubjectTeacher,
        Remark: this.TeacherForm.value.Remark,
        Salary: Number(this.TeacherForm.value.Salary)
      }

      if(this.isButton){
        
        this._configService.AddTeacher(model).subscribe((res:any)=>{
          if(res.state){
            this.ngOnInit();
          } else {
            alert(res.message);
          }
        })
      } else {
        // Update Teacher
        this._configService.updateTeacher(model).subscribe((res:any)=>{
          if(res.state){
            this.ngOnInit();
          } else {
            alert(res.message);
          }
        })
      }
  }

  delete(){
    this._configService.delTeacher(this.TeacherId).subscribe((res:any)=>{
      if(res.state){
        alert(res.message);
        this.ngOnInit();
      } else {
        alert(res.message);
      } 
    })
  }

  NewEntry(){
    this.TeacherForm.reset();
    this.allot();
  }

  // 

}
