import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-academic-year',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
  providers:[ConfigService],
  templateUrl: './academic-year.component.html',
  styleUrl: './academic-year.component.css'
})
export class AcademicYearComponent {

  data:any = [];
  keyboard = 'name';
  accdemicForm!:FormGroup
  isButton = true;
  constructor(private _fb: FormBuilder, private _configService: ConfigService){}
  ngOnInit(){
    this.Init();
  }

  Init(){
    this.accdemicForm = this._fb.group({
      AcademicName: ['', Validators.required],
      AcademicYear: ['', Validators.required],
    })
  }

  // ng Autocomplete Methods -- open
  selectEvent(item:any){
    this.accdemicForm.patchValue({
      AcademicName:item.AcademicName,
      AcademicYear:item.AcademicYear
    });
    this.isButton = false; 
  }
  onChangeSearch(val: string) {}
  onFocused(e:any){}
  // ng Autocomplete Methods -- close

  // OnSubmit Method
  onSubmit(){
    if(!this.accdemicForm.valid){
      alert("Form Invalid Filled");
      return;
    }
    let model = {
      AcademicName: this.accdemicForm.value.AcademicName,
      AcademicYear: this.accdemicForm.value.AcademicYear
    }
    if(this.isButton){
      this._configService.addAcademic(model).subscribe({
        next:(res)=>{
          alert("Academic Year Added Successfully");
          this.accdemicForm.reset();
          this.clear();
        },
        error:(err)=>{
          alert("Error while adding Academic Year");
        }
      })
    }else{
      this._configService.updateAcademic(model).subscribe({
        next:(res)=>{
          alert("Academic Year Updated Successfully");  
          this.clear();
        },
        error:(err)=>{
          alert("Error while updating Academic Year");
        }
      })
    }

  }
  // Allot Methods
  allot(){
    this._configService.viewAcademic().subscribe({
      next:(res)=>{
        this.data = res;
        this.clear();
      },
      error:(err)=>{
        alert("Error while fetching Academic Year");
      }
    })
  }
  // Delete Methord
  delete(){
    this._configService.delAcademic(this.accdemicForm.value.AcademicName).subscribe({
      next:(res)=>{
        alert("Academic Year Deleted Successfully");
        this.clear();
      },
      error:(err)=>{
        alert("Error while deleting Academic Year");
      }
    })
  }
  // Clear Methord
  clear(){
    this.ngOnInit();
  }
}
