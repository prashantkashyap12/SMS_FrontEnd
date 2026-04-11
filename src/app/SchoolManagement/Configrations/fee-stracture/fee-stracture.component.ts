import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ConfigService } from '../config.service';
import { max } from 'moment';

@Component({
  selector: 'app-fee-stracture',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
  providers: [ConfigService],
  templateUrl: './fee-stracture.component.html',
  styleUrl: './fee-stracture.component.css'
})
export class FeeStractureComponent {

  data:any = [];
  keyboard:string = 'FeeStractRemark';
  isButton:boolean = true;
  FeeStractForm!:FormGroup;
  ClassIdRec:any = [];
  FeeIdRec:any = [];

  constructor(private _configService:ConfigService, private _fb:FormBuilder){}
  ngOnInit(){
    this.Init()
    this.clear()
  }

  Init(){
    this.FeeStractForm = this._fb.group({
      FeeStractureId: [0],
      FeeId: [0, Validators.required],
      ClassId: [0,Validators.required],
      Fee_Amount: [0, Validators.required],
      Fee_Panalty: [0, Validators.required],
      FeeStractRemark: ['', Validators.required]
    })
  }

  // Auto Complete -- OPEN
  selectEvent(item:any){
    this.FeeStractForm.patchValue({
      FeeId: item.FeeId,
      ClassId: item.ClassId,
      Fee_Amount: item.Fee_Amount,
      Fee_Panalty: item.Fee_Panalty,
      FeeStractRemark: item.FeeStractRemark,
      FeeStractureId: item.FeeStractureId
    });
    this.isButton = false; 
  }
  onChangeSearch(val: string) {}
  onFocused(e:any){}
  // Auto Complete -- CLOSE

  onSubmit(){
    if(!this.FeeStractForm.valid){
      alert('Please Fill All Required Fields');
      return;
    }
    let model = {
      FeeId: this.FeeStractForm.value.FeeId,
      ClassId: this.FeeStractForm.value.ClassId,
      Fee_Amount: this.FeeStractForm.value.Fee_Amount,
      Fee_Panalty: this.FeeStractForm.value.Fee_Panalty,
      FeeStractRemark: this.FeeStractForm.value.FeeStractRemark,
      FeeStractureId: this.FeeStractForm.value.FeeStractureId??0
    }
    if(this.isButton){
      this._configService.addFeeStract(model).subscribe(res=>{
        alert(res.message);          
        this.clear();
      }, err=>{
        console.log(err);
      })
    }else{
      this._configService.updateFeeStract(model).subscribe(res=>{
        console.log(res);
        this.clear();
      }, err=>{
        console.log(err);
      })
    }
  }

  dataVal(a:any){
    console.log(a.target.value);
  }

  allot(){
    this._configService.viewFeeStract().subscribe(res=>{
      this.data = res.data;
    })
    // Get Generated Class
    this._configService.viewGenClass().subscribe(res=>{
      this.ClassIdRec = res.data;
    })
    // Get Fee Type
    this._configService.viewFee().subscribe(res=>{
      this.FeeIdRec = res.data;
    })
  }

  delete(){
    this._configService.delFeeStract(this.FeeStractForm.value.FeeStractureId).subscribe(res=>{
      alert(res.message);
      this.clear();
    })
  }

  clear(){
    this.FeeStractForm.reset();
    this.isButton = true;
    this.allot();
  }

}
