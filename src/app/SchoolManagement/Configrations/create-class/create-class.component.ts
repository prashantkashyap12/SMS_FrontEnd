import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-create-class',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
  providers: [ConfigService],
  templateUrl: './create-class.component.html',
  styleUrl: './create-class.component.css'
})
export class CreateClassComponent {

  data = [];
  keyboard = 'GenClassValue'
  isButton = true;
  GenClassForm!:FormGroup;
  ClassIdLs:any=[]
  ClassSectionIdLs:any=[]
  AcademicSessionIdLs:any=[]
  selectedSessionId:any = "Two Way DataBinding"

  constructor(private _configService:ConfigService, private _Fb:FormBuilder){}

  ngOnInit(){
    this.Init();
    this.clear();
  }

  Init(){
    this.GenClassForm = this._Fb.group({
      GenClassValue: [ Validators.required],
      ClassId: [0, Validators.required],
      SectionId: [0, Validators.required],
      SessionId: [0, Validators.required],
      GenClassKey:0
    })
  }

  // Data Marged
  dataBinding1(val:any,Id:any){
    
  }
  dataBinding2(val:any,Id:any){}
  dataBinding3(val:any,Id:any){}


  //Data allot of classRoman, classSection, academicSession, 
  allot(){
    // ClassId:any
    this._configService.viewGenClass().subscribe(res=>{
      this.data = res.data;
    })

    // ClassId:any
    this._configService.viewClass().subscribe(res=>{
      this.ClassIdLs = res.data;
    });

    // ClassSectionId:any
    this._configService.viewSection().subscribe(res=>{
      this.ClassSectionIdLs = res.data;
    });

    // AcademicSessionId:any
    this._configService.viewAcademic().subscribe(res=>{
      this.AcademicSessionIdLs = res.data;
    });
  }


  // Auto Complete -- OPEN
  selectEvent(item:any){
    this.GenClassForm.patchValue({
      GenClassValue:item.GenClassValue,
      ClassId:item.ClassId,
      SectionId:item.SectionId,
      SessionId:item.SessionId,
      GenClassKey:item.GenClassKey
    });
    this.isButton = false; 
  }
  onChangeSearch(val: string) {}
  onFocused(e:any){}
  // Auto Complete -- CLOSE


  // Update or Submit Method
  onSubmit(){
    if(!this.GenClassForm.valid){
      alert("Form Invalid Filled");
      return;
    }
    let model = {
      GenClassValue: this.GenClassForm.value.GenClassValue,
      ClassId: this.GenClassForm.value.ClassId,
      SectionId: this.GenClassForm.value.SectionId,
      SessionId: this.GenClassForm.value.SessionId,
      GenClassKey:this.GenClassForm.value.GenClassKey??0
    }
    // API Call
    if(this.isButton){
      this._configService.addGenClass(model).subscribe(res=>{
        alert("Class Added Successfully");
        this.clear();
      }, err=>{
        alert("Error while adding class");
      })
    }else{
      this._configService.updateGenClass(model).subscribe(res=>{
        alert("Class Updated Successfully");
        this.clear();
      }, err=>{
        alert("Error while updating class");
      })
    }
  }

  // Delete Method
  delete(){
    if(this.isButton){
      alert("Please select a class to delete");
      return;
    }
    this._configService.delGenClass(this.GenClassForm.value.GenClassKey).subscribe(res=>{
      alert("Class Deleted Successfully");
      this.clear();
    }, err=>{
      alert("Error while deleting class");
    })
  }

  // Clear Form
  clear(){
    this.GenClassForm.reset();
    this.isButton = true;
    this.allot();
  }

}
