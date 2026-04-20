import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, model } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { KharchaService } from '../kharcha.service';

@Component({
  selector: 'app-add-kharcha',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
  providers: [KharchaService],
  templateUrl: './add-kharcha.component.html',
  styleUrl: './add-kharcha.component.css'
})
export class AddKharchaComponent {

  isButton:any = true;
  Kharcha!: FormGroup;
  data:any = [];
  keyword = 'TranType';
  constructor(private _fb:FormBuilder, private _kharchaService:KharchaService) { }
  ngOnInit(){
    this.Init()
    this.Allot()
  }

  Init(){
    this.Kharcha = this._fb.group({
      Date: [''],
      
      ReceiptNumber: [''],
      CustomerId: [''],
      CustomerName: [''],
      CustomerContact: [''],

      TranType: [''],
      CategorySelect: [''],
      Discription: [''],
      GrandTotal: [''],
      CurrentPay: [''],
      CurrentDue: [''],
      Balance: [''],
      paymentMode: [''],
    })
  }

  selectEvent(item:any){
    this.Kharcha.patchValue({
      Date: item.Date,
      ReceiptNumber: item.ReceiptNumber,
      CustomerId: item.CustomerId,
      CustomerName: item.CustomerName,
      CustomerContact: item.CustomerContact,
      TranType: item.TranType,
      CategorySelect: item.CategorySelect,
      Discription: item.Discription,
      GrandTotal: item.GrandTotal,
      CurrentPay: item.CurrentPay,
      CurrentDue: item.CurrentDue,
      Balance: item.Balance,
      paymentMode: item.paymentMode
    });
    this.isButton = false; 
  }
  onChangeSearch(val: string) {}
  onFocused(e: any) {}
  
  Allot(){
    this._kharchaService.GetKharcha().subscribe(res=>{
      this.data = res.data;
      this.isButton = true;
    },err=>{
      console.log(err.message);
    })

    

  }

  onSubmit(){
    if(this.Kharcha.invalid){
      return;
    }
    let model={
      Date: this.Kharcha.value.Date,
      
      ReceiptNumber: this.Kharcha.value.ReceiptNumber,
      CustomerId: this.Kharcha.value.CustomerId,
      CustomerName: this.Kharcha.value.CustomerName,
      CustomerContact: this.Kharcha.value.CustomerContact,

      TranType: this.Kharcha.value.TranType,
      CategorySelect: this.Kharcha.value.CategorySelect,
      Discription: this.Kharcha.value.Discription,
      GrandTotal: this.Kharcha.value.GrandTotal,
      CurrentPay: this.Kharcha.value.CurrentPay,
      CurrentDue: this.Kharcha.value.CurrentDue,
      Balance: this.Kharcha.value.Balance,
      paymentMode: this.Kharcha.value.paymentMode
    }

    if(this.isButton){
      this._kharchaService.PostKharcha(model).subscribe(res=>{
      alert(res.message);
      this.Allot()
      },err=>{
        console.log(err.message);
      })  
    }
    else{
      this._kharchaService.UpdateKharcha(model).subscribe(res=>{
        this.Allot()
        alert(res.message);
      },err=>{
        console.log(err.message);
      })
    }
  }

}
