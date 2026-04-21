import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, model } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ConfigService } from '../config.service';

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
      Remark:['']
    })
  }

  selectEvent(a:any){

    this.TeacherForm.patchValue({
      TeacherId: a.TeacherId,
      Name: a.Name,
      Contact: a.Contact,
      UID: a.UID,
      JoiningDate: a.JoiningDate,
      ClassId: a.ClassId,
      SubjectTeacher: a.SubjectTeacher,
      Remark: a.Remark
    })
    this.isButton = false;  
    
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
    })

  }
  onSubmit(){
      if(!this.TeacherForm.valid){
        return;
      }
      let model = {
        TeacherId: this.TeacherForm.value.TeacherId??0,
        Name: this.TeacherForm.value.Name,
        Contact: this.TeacherForm.value.Contact,
        UID: this.TeacherForm.value.UID,
        JoiningDate: this.TeacherForm.value.JoiningDate,
        ClassId: Number(this.TeacherForm.value.ClassId),
        SubjectTeacher: this.TeacherForm.value.SubjectTeacher,
        Remark: this.TeacherForm.value.Remark
      }

      if(this.isButton){
        
        this._configService.AddTeacher(model).subscribe((res:any)=>{
          if(res.success){
            alert(res.message);
            this.TeacherForm.reset();
            this.allot();
          } else {
            alert(res.message);
          }
        })
      } else {
        // Update Teacher
        this._configService.updateTeacher(model).subscribe((res:any)=>{
          if(res.success){
            alert(res.message);
            this.TeacherForm.reset();
            this.allot();
          } else {
            alert(res.message);
          }
        })
      }
  }

  Delete(){
    this._configService.delTeacher(this.TeacherForm.value.TeacherId).subscribe((res:any)=>{
      if(res.success){
        alert(res.message);
        this.TeacherForm.reset();
        this.allot();
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
