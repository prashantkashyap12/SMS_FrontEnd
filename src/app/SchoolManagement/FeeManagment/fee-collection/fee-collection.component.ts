import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StdManagService } from '../../StudentManagment/std-manag.service';
import { ConfigService } from '../../Configrations/config.service';
import { urls } from '../../../common/common';
import moment from 'moment';

@Component({
  selector: 'app-fee-collection',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  providers:[StdManagService, ConfigService],
  templateUrl: './fee-collection.component.html',
  styleUrl: './fee-collection.component.css'
})
export class FeeCollectionComponent {

  AllClassRec:any = [];
  data:any = [];
  isList:boolean = true;
  isFees:boolean = false;
  public url = new urls().webApiUrl+'wwwroot/';

  ngOnInit(){
    this.Allot();
    this.Init()
  }
  
  constructor(private _studentManager:StdManagService, private _cofigService:ConfigService, private _fb:FormBuilder ){
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
    this.getFeeLs(this.viewProfile.FeeLsId);
  }

  // Fee Management -- open
  FeeDepo!:FormGroup;
  Init(){
    this._fb.group({
      
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

  FeeMonth(a:any){

  }


  // transactionId:any  // Generate Transaction Id last Id Online ?? ''
  // studTran:any       // Self Genenrated 
  // receipt:any  = "By API Gen"      // d Auto Genenrated by API
  // tranDate:any = moment(new Date()).format("YYYY-MM-DD")     // d Self Genenrated
  // feeMonth:any       // d User Input
  // feeAmount:any ="101"; // User Input
  // discount:any    // d
  // lateCharges:any  // d
  // totalPay:any   // d
  // dueWallet:any
  // tranMode:any    
  // grandTotal:any  // d
  // remark:any




}
