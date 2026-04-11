import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-fee-type',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
  providers: [ConfigService],
  templateUrl: './fee-type.component.html',
  styleUrl: './fee-type.component.css'
})
export class FeeTypeComponent {

  data = [];
  keyword = 'FeeName';
  isButton = true;
  FeeTypeForm!:FormGroup;
  constructor(private _configService:ConfigService, private _fb:FormBuilder){}
  ngOnInit(){
    this.Init();
    this.allot();
  }

  Init(){
    this.FeeTypeForm = this._fb.group({
      FeeName: ['', Validators.required],
      FeeReamrk: ['', Validators.required],
      FeeId: 0
    })
  }

  // Auto Complete -- OPEN
  selectEvent(item:any){
    this.FeeTypeForm.patchValue({
      FeeName:item.FeeName,
      FeeReamrk:item.FeeReamrk,
      FeeId:item.FeeId
    });
    this.isButton = false; 
  }
  onChangeSearch(val: string) {}
  onFocused(e:any){}
  // Auto Complete -- close

  
  allot(){
    this._configService.viewFee().subscribe(res=>{
      this.data = res.data;
    }, err=>{
      alert("Error while fetching class data");
    });
  }

  // OnSubmit Method
  onSubmit(){
    if(!this.FeeTypeForm.valid){
      alert("Form Invalid Filled");
      return;
    }
    let model = {
      FeeName: this.FeeTypeForm.value.FeeName,
      FeeReamrk: this.FeeTypeForm.value.FeeReamrk,
      FeeId : this.FeeTypeForm.value.FeeId ?? 0
    }
    if(this.isButton){
      this._configService.addFee(model).subscribe({
        next:(res)=>{
          alert("Fee Type Added Successfully");
          this.clear();
        },
        error:(err)=>{
          alert("Error while adding fee type");
        }
      });
    }else{
      this._configService.updateFee(model).subscribe({
        next:(res)=>{
          alert("Fee Type Updated Successfully");
          this.clear();
        },
        error:(err)=>{
          alert("Error while updating fee type");
        }
      });
    }
  }

  // Delete Method
  delete(){
    this._configService.delFee(this.FeeTypeForm.value.FeeId).subscribe(res=>{
      alert("Fee Type Deleted Successfully");
      this.clear();
    }, err=>{
      alert("Error while deleting fee type");
    });
  }

  // Clear Form
  clear(){
    this.FeeTypeForm.reset();
    this.isButton = true;
    this.allot();
  }

}
