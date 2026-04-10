import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ConfigService } from '../config.service';
import moment from 'moment';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule, AutocompleteLibModule],
  providers: [ConfigService],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {

  // Basic definations
  classForm!:FormGroup
  keyword = 'name';
  data = [];
  isButton = true;


  constructor(private _fb:FormBuilder, private _configService: ConfigService){}
  ngOnInit(){
    this.Init()
  }


  // Inislization Form
  Init(){
    this.classForm = this._fb.group({
      ClassName: ['',Validators.required],
      classRoman: ['', Validators.required]
    })
  }

  // ng Autocomplete Methods -- open
  selectEvent(item:any){
    this.classForm.patchValue({
      className:item.ClassName,
      classRoman:item.classRoman
    });
    this.isButton = false; 
  }

  onChangeSearch(val: string) {}
  onFocused(e:any){}
  // ng Autocomplete Methods -- close

  // OnSubmit Method
  onSubmit(){
    // check isValid or not
    if(!this.classForm.valid){
      alert("Form Invalid Filled");
      return;
    }

    // Api formatting
    let model = {
      ClassName: this.classForm.value.ClassName,
      classRoman: this.classForm.value.classRoman,
      CreatedBy: 1,
      CreatedOn: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    // Api call
    if(this.isButton){
      // Add code here
      this._configService.addClass(model).subscribe(res=>{
        alert("Class Added Successfully");
        this.clear();
      }, err=>{
        alert("Error while adding class");
      })
    }else{
      // Update code here
      this._configService.updateClass(model).subscribe(res=>{
        alert("Class Updated Successfully");
        this.clear();
      }, err=>{
        alert("Error while updating class");
      })
    }
  }


  // Data Allot Methrod
  allot(){
    this._configService.viewClass().subscribe(res=>{
      this.data = res;
    }, err=>{
      alert("Error while fetching class data");
    })
  }

  // Delete Methord
  delete(){
    this._configService.delClass(this.classForm.value.ClassName).subscribe(res=>{
      alert("Class Deleted Successfully");
      this.clear();
    }, err=>{
      alert("Error while deleting class");
    })
  }



  // Clear Form
  clear(){
    this.ngOnInit();
  }


}
