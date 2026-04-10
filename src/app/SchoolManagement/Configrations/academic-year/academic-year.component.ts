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
  keyboard = 'SessionName';
  accdemicForm!:FormGroup
  isButton = true;
  constructor(private _fb: FormBuilder, private _configService: ConfigService){}
  ngOnInit(){
    this.Init();
    this.allot();
  }

  Init(){
    this.accdemicForm = this._fb.group({
      SessionName: ['', Validators.required],
      SessionYear: ['', Validators.required],
      SessionId:[0]
    })
  }

  // ng Autocomplete Methods -- open
  selectEvent(item:any){
    this.accdemicForm.patchValue({
      SessionName:item.SessionName,
      SessionYear:item.SessionYear,
      SessionId:item.SessionId

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
      SessionName: this.accdemicForm.value.SessionName,
      SessionYear: this.accdemicForm.value.SessionYear,
      SessionId:this.accdemicForm.value.SessionId??0
    }
    if(this.isButton){
      this._configService.addAcademic(model).subscribe(res=>{
        // next:(res)=>{  
          alert("Academic Year Added Successfully");
          this.clear();
        },
        (err)=>{
          alert("Error while adding Academic Year");
        })
    }else{
      this._configService.updateAcademic(model).subscribe(res=>{
        // (res)=>{
          alert("Academic Year Updated Successfully");  
          this.clear();
        },
        (err)=>{
          alert("Error while updating Academic Year");
        }
      )}
    }
  // Allot Methods
  allot(){
    this._configService.viewAcademic().subscribe(res=>{ 
        this.data = res.data;
      },err=>{
          alert("Error while fetching Academic Year");
      })
  }
  // Delete Methord
  delete(){
    this._configService.delAcademic(this.accdemicForm.value.SessionId).subscribe({
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
    this.accdemicForm.reset();
    this.isButton = true;
  }
}
