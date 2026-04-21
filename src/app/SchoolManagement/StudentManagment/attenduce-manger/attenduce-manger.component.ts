import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from '../../Configrations/config.service';
import { StdManagService } from '../std-manag.service';

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
  constructor(private _config:ConfigService, private _stdRec:StdManagService){} 
  ngOnInit(){
    this.allot()
  }

    allot(){
      this._config.viewTeacher().subscribe((res:any)=>{
        this.teacherList = res.message;
      })
    }

    onTeacherChange(event:any){
      console.log(event);
      let classId = Number(event.target.value);
      this.techerData = this.teacherList.filter((item:any) => item.ClassId === classId);
      console.log("TeacherRec = "+this.techerData);
      this._stdRec.AllStudentRecord().subscribe((res:any)=>{
       let result = res.data;
       this.StudnetList = result.filter((item:any) => item.ClassGenId === classId);
       console.log("StudentList"+this.StudnetList);
      })
    }

}
