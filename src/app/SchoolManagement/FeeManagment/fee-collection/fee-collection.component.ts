import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StdManagService } from '../../StudentManagment/std-manag.service';
import { ConfigService } from '../../Configrations/config.service';
import { urls } from '../../../common/common';
import moment from 'moment';
import { FeeManagerService } from '../fee-manager.service';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'app-fee-collection',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, CommonModule],
  providers:[StdManagService, ConfigService, FeeManagerService],
  templateUrl: './fee-collection.component.html',
  styleUrl: './fee-collection.component.css'
})
export class FeeCollectionComponent {

  AllClassRec:any = [];
  data:any = [];
  isList:boolean = true;
  isFees:boolean = false;
  public url = new urls().webApiUrl+'wwwroot/';

  
  receipt:any;          // d Auto Genenrated by API
  tranDate:any = moment(new Date()).format("YYYY-MM-DD")     // d Self Genenrated
  // feeMonth:any       // d User Input
  // feeAmount:any ="101"; // User Input
  discount:any    // d
  // lateCharges:any  // d
  // totalPay:any   // d
  // dueWallet:any
  // tranMode:any    
  grandTotal:any  // d
  // remark:any

  ngOnInit(){
    this.Allot();
    this.Init()
  }
  
  constructor(private _studentManager:StdManagService, private _cofigService:ConfigService, private _fb:FormBuilder, private _feeManager:FeeManagerService ){
  }

  // Get Data
  Allot(){
    this._studentManager.AllStudentRecord().subscribe(res=>{
    this.data = res.data;
    })
    this._cofigService.viewGenClass().subscribe(res=>{
      this.AllClassRec = res.data;
    })
  }




  // Filter via Keywords
  nameFilter(a:any){
    const value = a.target.value.toLowerCase();
    if (!value) {
      this.data2 = this.data;
      return;
    }
    this.data2 = this.data.filter((a: any) => {
      return (
        a.FirstName?.toLowerCase().includes(value) ||
        a.LastName?.toLowerCase().includes(value) ||
        a.FatherName?.toLowerCase().includes(value) ||
        a.MotherName?.toString().includes(value) ||
        a.GuardianName?.toString().includes(value) ||
        a.ParentsEmail?.toString().includes(value) ||
        a.UID?.toString().includes(value) ||
        a.PrimaryContact?.toString().includes(value) ||
        a.SecondaryContact?.toString().includes(value)
      );
    });
  }

  // Fiter via ClassId 
  data2:any [] = [];
  filterName:any;
  viewProfile:any= [];
  classChange(a:any){
    this.isFees = false;
    let id = a.target.value;
    this.data2 = this.data.filter((a:any)=>a.ClassGenId==id);
    console.log(this.data2.length);   
  }

  viewProfle:any
  dueDate = moment(new Date()).format("YYYY-MM-15");
  OpenFee(a:any){
    this.isFees = true;
    this.isList = false;
    this.viewProfile = a;
    this.walletget(this.viewProfile.AdmissionId);
    this.getFeeLs(this.viewProfile.FeeLsId);
  }

  // Fee Management -- open
  FeeDepo!:FormGroup;
  Init(){
    this.FeeDepo = this._fb.group({
      TransactionId: [''],
      StudTran: [''],     //
      Receipt: [''],       // 
      TranDate: [''],      //
      FeeMonth: [''],      //
      FeeAmount: [''],     //
      Discount: ['0'],      //
      DueDate: [''],       // 
      LateCharges: [''],  //
      TotalPay: [''],      //
      DueWallet: [''],     //
      TranMode: [''],      //
      GradTotal: [''],        //
    })
  }



  dataFeeRec:any = [];
  feeValue:any = [];
  feeStract:any = [];
  getFeeLs(ab:any){
    this._cofigService.viewFee().subscribe(res=>{
      this.dataFeeRec = res.data;
      let abs = ab.split(',');
      this.feeValue = this.dataFeeRec.filter((b: any) =>
        abs.includes(String(b.FeeId))
      );
      console.log("Fee Value"+this.feeValue);
    })
    this._cofigService.viewFeeStract().subscribe(res=>{
      this.feeStract = res.data;
      console.log("Fee Structure "+this.feeStract);
    })

    console.log(this.viewProfile.ClassGenId);
    setTimeout(() => {
      this.feeValue.forEach((a: any) => {
        let stract = this.feeStract.filter((b: any) => b.FeeId == a.FeeId);
        a['stracture'] = stract;
      });
      console.log("Final Touch"+this.feeValue);
    }, 2000);
    
    
    
  }

  // Wallet Get
  Getwallet:any = [];
  walletget(AdmissionId:any){
    this._feeManager.getFeeStructure(AdmissionId).subscribe(res=>{
      let lastRec = res.data;
      this.Getwallet = lastRec.DueWallet ?? 0;
    })
  }

   totalAmount = 0;
   totalPenalty = 0;
  FeeMonth(a:any){
    console.log(a.target.value);
    this._feeManager.getRecipit().subscribe(res=>{
      console.log(res.data); 
      this.receipt = "ISHWARIPRASAD_"+res.data.toString();
    })
    this.FeeCalc();
  }

  baseTotal:any;
  FeeCalc(){
    // Total Value Extraction
    let totalPenalty = 0;
    this.totalAmount = 0;
    this.totalPenalty = 0;
    this.feeValue.forEach((item: any) => {
        item.stracture.forEach((s: any) => {
            this.totalAmount += Number(s.Fee_Amount);
            totalPenalty += Number(s.Fee_Panalty);
        });
    });
    this.dueDate;
    this.tranDate;
    if(this.dueDate < this.tranDate){
      this.totalPenalty += totalPenalty;
    }
    this.grandTotal = this.totalAmount + this.totalPenalty;
  }

  discountCalc(event:any){
    setTimeout(()=>{
      const discountAmount = (this.grandTotal/100) * Number(event.target.value);
      this.baseTotal = this.grandTotal - discountAmount;
    },2000)
  }


  // Payment Type - Online/Offline
  PaymentTypeValue:any;
  PaymentType(event:any){
    console.log(event.target.value);
    console.log(this.FeeDepo.value);
    this.FeeDepo.value.TransactionId = event.target.value;

  }


  onSubmit(){
    let model = {
      TransactionId: this.FeeDepo.value.TransactionId ?? '',
      StudTran: this.FeeDepo.value.StudTran ?? '-',
      Receipt: this.FeeDepo.value.Receipt ?? '-',
      TranDate: this.FeeDepo.value.TranDate ?? '-',
      FeeMonth: this.FeeDepo.value.FeeMonth ?? '-',
      FeeAmount: String(this.totalAmount) ?? '-',
      Discount: String(this.FeeDepo.value.Discount) ?? '0',
      DueDate: this.FeeDepo.value.DueDate ?? '-',
      LateCharges: String(this.FeeDepo.value.LateCharges) ?? '-',
      TotalPay: String(this.totalAmount) ?? '',
      DueWallet: String(this.FeeDepo.value.DueWallet) ?? '-',
      TranMode: this.FeeDepo.value.TranMode ?? '-',
      GrandTotal: String(this.FeeDepo.value.GradTotal) ?? '',
    }
    // if(this.FeeDepo.valid){
      this._feeManager.FeeCollection(model).subscribe(res=>{
        if(res.state){
          alert("Fee Collected Successfully");
          this.ngOnInit();
          window.location.reload();
        }
        else{
          alert(res.data);
        }
      })
    // }
  }



}
