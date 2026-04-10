import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfigService } from '../config.service';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
  providers: [ConfigService],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {

  data = [];
  keyboard = 'SectionName';
  isButton = true;
  sectionForm!:FormGroup;  

  constructor(private _configService:ConfigService, private _Fb:FormBuilder){
  }
  ngOnInit(){
    this.Init()
    this.allot();
  }

  Init(){
    this.sectionForm = this._Fb.group({
      SectionName: ['',[Validators.required]],
      SectionNumber: ['',[Validators.required]],
      SectionId:[0]
    })  
  }



  // Auto Complete -- OPEN
  selectEvent(a:any){
    this.sectionForm.patchValue({
      SectionName: a.SectionName,
      SectionNumber: a.SectionNumber,
      SectionId:a.SectionId
    });
    this.isButton = false;   
  }
  onChangeSearch(a:any){}
  onFocused(a:any){}
  // Auto Complete -- close





  // Data Allot Methrod
  allot(){
    this._configService.viewSection().subscribe(res=>{
      this.data = res.data;
    }, err=>{
      alert("Error while fetching class data");
    })
  }


  // OnSubmit + Update Methord
  onSubmit(){
    if(!this.sectionForm.valid){
      alert("Form Invalid Filled");
      return;
    }

    let model = {
      SectionName: this.sectionForm.value.SectionName,
      SectionNumber: this.sectionForm.value.SectionNumber,
      SectionId: this.sectionForm.value.SectionId??0,
      CreatedOn: new Date()
    }

    // Handle form submission
    if(this.isButton){
      this._configService.addSection(model).subscribe(res=>{
        alert("Section Added Successfully");
        this.clear();
      }, err=>{
        alert("Error while adding section");
      })
    }else{
      this._configService.updateSection(model).subscribe(res=>{
        alert("Section Updated Successfully");
        this.clear();
      }, err=>{
        alert("Error while updating section");
      })
    }
  }

  // Delete Methord
  delete(){
    this._configService.delSection(this.sectionForm.value.SectionId).subscribe(res=>{
      alert("Section Deleted Successfully");
      this.clear();
    }, err=>{
      alert("Error while deleting section");
    })
  }

  // Clear Form
  clear(){
    this.allot();
    this.sectionForm.reset();
    this.isButton = true;
  }

}
