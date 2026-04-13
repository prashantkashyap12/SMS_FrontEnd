import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StdManagService } from '../std-manag.service';
import { ConfigService } from '../../Configrations/config.service';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { urls } from '../../../common/common';

@Component({
  selector: 'app-student-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, JsonPipe, RouterLink, RouterModule],
  providers:[StdManagService, ConfigService],
  templateUrl: './student-doc.component.html',
  styleUrl: './student-doc.component.css'
})
export class StudentDocComponent {

  baseUrl = new urls().webApiUrl+"wwwroot/";
  constructor(private _router:ActivatedRoute ,private _config:ConfigService, private _studentService:StdManagService){}
  ngOnInit(){
    this.allot();
  }

  mainData:any=[];
  allot(){
    let recId;
    this._router.paramMap.subscribe(res=>{
      recId = res.get('id');
    })

    this._studentService.AllStudentRecord2(recId).subscribe(res=>{
      this.mainData = res.data[0];
    })

  }



}
