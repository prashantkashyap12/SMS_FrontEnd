import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StdManagService } from '../../StudentManagment/std-manag.service';
import { ConfigService } from '../../Configrations/config.service';
import { urls } from '../../../common/common';
import moment from 'moment';
import { FeeManagerService } from '../fee-manager.service';
import { timeInterval, timeout } from 'rxjs';

@Component({
  selector: 'app-fee-collection',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
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
    console.log(this.data);
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
    this.feeValue = [];
    this.isFees = false;
    let id = a.target.value;
    this.data2 = this.data.filter((a:any)=>a.ClassGenId==id);
    console.log(this.data2.length);   
  }

  viewProfle:any
  dueDate = moment(new Date()).format("YYYY-MM-15");;
  OpenFee(a:any){
    this.isFees = true;
    this.isList = false;
    this.viewProfile = a;
    this.walletget(this.viewProfile.AdmissionId);
    this.getFeeLs(this.viewProfile.FeeLsId);
    console.log(this.viewProfile);
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
  feeStract:any = [];
  abs:any=[];
  getFeeLs(ab:any){
    this._cofigService.viewFee().subscribe(res=>{
      this.dataFeeRec = res.data;
      this._cofigService.viewFeeStract().subscribe(res=>{
        this.feeStract = res.data;
        this.abs = ab.split(',').map((a:string)=>Number(a));
        // console.log("Fee List "+this.dataFeeRec);
        // console.log("Fee Structure "+this.feeStract);
        // console.log("Selected Student Fees"+this.abs);
        this.filterNames()
      })
    })    
  }
  feeValue:any = [];
  filterNames(){
    for(let data of this.abs){
       this.feeValue.push(this.feeStract.find((a:any)=>a.FeeStractureId ==data));
    }
    this.feeValue = this.feeValue.map((obj: any) => {
      let data = this.dataFeeRec.find((a: any) => a.FeeId == obj.FeeId);
      return {
        ...obj,
        FeeName: data ? data.FeeName : null
      };
    });
    console.log(this.feeValue);
  }





  // Wallet Get
  Getwallet:any = 0;
  walletget(AdmissionId:any){
    this._feeManager.getFeeStructure(AdmissionId).subscribe(res=>{
      let lastRec = res.data;
      this.Getwallet = lastRec.DueWallet ?? 0;
    })
  }

  CurrentDue:any;
  payAmount:any;
  walletUpdate(a:any){
  this.payAmount = a.target.value
    this.CurrentDue = this.baseTotal - a.target.value;
    // this.Getwallet = this.CurrentDue;
    console.log(this.Getwallet);
  }

   totalAmount = 0;
   totalPenalty = 0;
  FeeMonth(a:any){
    let currentDate = new Date();
    currentDate.setMonth(Number(a.target.value));
    this.dueDate = moment(currentDate).format("YYYY-MM-15");

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
        // item.forEach((s: any) => {
            this.totalAmount += Number(item.Fee_Amount);
            totalPenalty += Number(item.Fee_Panalty);
        // });
        
    });
    this.dueDate;
    this.tranDate;
    if(this.dueDate < this.tranDate){
      this.totalPenalty += totalPenalty;
    }
    this.grandTotal = this.totalAmount + this.totalPenalty;
    this.baseTotal = this.grandTotal;
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
    if(this.CurrentDue<0){
      this.Getwallet =(+this.Getwallet)+ this.CurrentDue;
    }else{
      this.Getwallet =(+this.Getwallet)+ this.CurrentDue;
    }
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
      TotalPay: String(this.payAmount) ?? '',
      DueWallet: String(this.Getwallet) ?? '-',
      TranMode: this.FeeDepo.value.TranMode ?? '-',
      GrandTotal: String("N/A") ?? '',
    }
    this._feeManager.FeeCollection(model).subscribe(res=>{
      if(res.state){
        this.ngOnInit();
        this.feeValue = [];
        this.isFees = false;
        window.location.reload();
      }
      else{
        alert(res.data);
      }
    })
  }



}
