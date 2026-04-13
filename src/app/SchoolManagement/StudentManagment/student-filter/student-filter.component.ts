import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { StdManagService } from '../std-manag.service';
import { urls } from '../../../common/common';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfigService } from '../../Configrations/config.service';

@Component({
  selector: 'app-student-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule, RouterLink, NgxPaginationModule],
  providers:[StdManagService, ConfigService],
  templateUrl: './student-filter.component.html',
  styleUrl: './student-filter.component.css'
})
export class StudentFilterComponent {

  data:any[]=[];
  Url:string = new urls().webApiUrl+'wwwroot/';
  constructor(private _studentManager:StdManagService, private _cofigService:ConfigService ){
  }
  ngOnInit(){ 
    this.allot();

  }

   AllClassRec:any
   allot(){
      this._studentManager.AllStudentRecord().subscribe(res=>{
      this.data = res.data;
      })

      this._cofigService.viewGenClass().subscribe(res=>{
        this.AllClassRec = res.data;
      })
  }


   data2:any;
   filterName:any;


   classChange(a:any){
    let id = a.target.value;
    this.data2 = this.data.filter((a:any)=>a.ClassGenId==id);
    console.log(this.data2.length);   
  }

  nameFilter(a:any){
    const value = a.target.value.toLowerCase();
    if (!value) {
      this.data2 = this.data;
      return;
    }

    this.data2 = this.data.filter((a: any) => {
      return (
        a.FirstName?.toLowerCase().includes(value) ||
        a.LastName?.toLowerCase().includes(value) ||
        a.FatherName?.toLowerCase().includes(value) ||
        a.MotherName?.toString().includes(value) ||
        a.GuardianName?.toString().includes(value) ||
        a.ParentsEmail?.toString().includes(value) ||
        a.UID?.toString().includes(value) ||
        a.PrimaryContact?.toString().includes(value) ||
        a.SecondaryContact?.toString().includes(value)

      );
    });
  }

  removeStduent(a:any){
    let oke = confirm("Do you want to permantly delete")
    if(oke){
      alert("Sorry m Joking ")
    }
  }

  openProfile(){

  }

}
