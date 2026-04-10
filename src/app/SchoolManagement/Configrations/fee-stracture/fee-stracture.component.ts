import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ConfigService } from '../config.service';

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
  keyboard:string = 'name';
  isButton:boolean = true;
  FeeStractForm!:FormGroup;
  ClassId:any;
  AcademicSessionId:any;

  constructor(private _configService:ConfigService, private _fb:FormBuilder){}
  ngOnInit(){
    this.Init()
    this.clear()
  }

  Init(){
    this.FeeStractForm = this._fb.group({
      ClassId: ['',Validators.required],
      AcademicSessionId: ['', Validators.required],
      FeeAmount: ['', Validators.required],
      LateFeePenalty: ['', Validators.required],
      Remark: ['', Validators.required]
    })
  }

  // Auto Complete -- OPEN
  selectEvent(item:any){
    this.FeeStractForm.patchValue({
      ClassId: item.ClassId,
      AcademicSessionId: item.AcademicSessionId,
      FeeAmount: item.FeeAmount,
      LateFeePenalty: item.LateFeePenalty,
      Remark: item.Remark
    });
    this.isButton = false; 
  }
  onChangeSearch(val: string) {}
  onFocused(e:any){}
  // Auto Complete -- CLOSE

  onSubmit(){
    if(this.FeeStractForm.valid){
      console.log(this.FeeStractForm.value);
    }
    let model = {
      ClassId: this.FeeStractForm.value.ClassId,
      AcademicSessionId: this.FeeStractForm.value.AcademicSessionId,
      FeeAmount: this.FeeStractForm.value.FeeAmount,
      LateFeePenalty: this.FeeStractForm.value.LateFeePenalty,
      Remark: this.FeeStractForm.value.Remark
    }
    if(this.isButton){
      this._configService.addFeeStract(model).subscribe(res=>{
        console.log(res);
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



  allot(){
    this._configService.viewFeeStract().subscribe(res=>{
      this.data = res;
    })
    // Get Class
    this._configService.viewClass().subscribe(res=>{
      this.ClassId = res;
    })
    // Get Academic Session
    this._configService.viewAcademic().subscribe(res=>{
      this.AcademicSessionId = res;
    })
  }

  delete(){
    this._configService.delFeeStract(this.FeeStractForm.value).subscribe(res=>{
      console.log(res);
      this.clear();
    })
  }

  clear(){
    this.FeeStractForm.reset();
    this.isButton = true;
    this.allot();
  }


}
