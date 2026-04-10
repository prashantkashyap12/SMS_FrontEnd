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
  keyboard = 'name'
  isButton = true;
  GenClassForm!:FormGroup;
  ClassId:any
  ClassSectionId:any
  AcademicSessionId:any

  constructor(private _configService:ConfigService, private _Fb:FormBuilder){}

  ngOnInit(){
    this.Init();
    this.clear();
  }

  Init(){
    this.GenClassForm = this._Fb.group({
      className: ['', Validators.required],
      classRoman: ['', Validators.required],
      classSection: ['', Validators.required],
      academicSession: ['', Validators.required]
    })
  }

  //Data allot of classRoman, classSection, academicSession, 
  allot(){
    // ClassId:any
    this._configService.viewGenClass().subscribe(res=>{
      this.data = res;
    })

    // ClassId:any
    this._configService.viewClass().subscribe(res=>{
      this.ClassId = res;
    });

    // ClassSectionId:any
    this._configService.viewSection().subscribe(res=>{
      this.ClassSectionId = res;
    });

    // AcademicSessionId:any
    this._configService.viewAcademic().subscribe(res=>{
      this.AcademicSessionId = res;
    });
  }


  // Auto Complete -- OPEN
  selectEvent(item:any){
    this.GenClassForm.patchValue({
      className:item.ClassName,
      classRoman:item.classRoman,
      classSection:item.classSection,
      academicSession:item.academicSession
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
      ClassName: this.GenClassForm.value.className,
      classRoman: this.GenClassForm.value.classRoman,
      classSection: this.GenClassForm.value.classSection,
      academicSession: this.GenClassForm.value.academicSession,
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
    this._configService.delGenClass(this.GenClassForm.value.className).subscribe(res=>{
      alert("Class Deleted Successfully");
      this.clear();
    }, err=>{
      alert("Error while deleting class");
    })
  }

  // Clear Form
  clear(){
    this.GenClassForm.reset();
    this.isButton = true;``
    this.allot();
  }

}
