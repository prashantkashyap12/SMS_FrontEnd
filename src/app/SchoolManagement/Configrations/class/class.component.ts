import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-class',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './class.component.html',
  styleUrl: './class.component.css'
})
export class ClassComponent {


  // Basic definations
  classForm!:FormGroup
  constructor(private _fb:FormBuilder){}
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

  // Allot Methrod


  // Delete Methord
  delete(){
    
  }

  // OnSubmit Method
  onSubmit(){
    if(!this.classForm.valid){
      alert("Form invalid Filled");
    }

  }

  // Clear Form
  clear(){
    this.ngOnInit();
  }


}
