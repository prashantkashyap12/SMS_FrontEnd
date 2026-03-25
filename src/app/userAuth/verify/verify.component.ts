import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserAuthService } from '../user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers:[UserAuthService],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.css'
})
export class VerifyComponent {

  loader:boolean = false;
  userVerify!: FormGroup;
  @ViewChild('isHidden') HidePwd!:ElementRef;
  email:any;
  password:any;
  tempPwd:any;
  minStr:any;
  secStr:any;

  constructor(private _fb:FormBuilder, 
    @Inject(PLATFORM_ID) private platformId: Object, 
    private _auth:UserAuthService,
    private _router:Router
  ){}

  ngOnInit(){
    this.TimeCoutner();
    // this.password == "000000" ? this.tempPwd = true : this.tempPwd = false;
    if (isPlatformBrowser(this.platformId)) {
      this.email = localStorage.getItem('email');
      this.password = localStorage.getItem('password');
      this.password = this.password == "000000" ? "" : this.password; 
      if(this.password == ""){
        this.tempPwd = false;
      }else{
        this.tempPwd = true;
      }
    }
    this.initForm();  
  }

  initForm(){
    this.userVerify = this._fb.group({
      email: [this.email, Validators.required,],
      password: [this.password, Validators.required],
      otp: ['', Validators.required]
    })
  }

  TimeCoutner(){
    let minutes = 10;
    let seconds = 0;
    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      this.minStr = minutes.toString().padStart(2, '0');
      this.secStr = seconds.toString().padStart(2, '0');
    }, 1000);
  }

   datamodel(){
    return {
      email :this.userVerify.value.email ?? '',
      password : this.userVerify.value.password ?? '',
      otp:this.userVerify.value.otp ?? ''
    };
  }

  onSubmit(){
    this.loader = true;
    if(this.userVerify.invalid){
      alert("form Invalid");
      this.loader = false;
      return;
    }
    const model = this.datamodel();
    this._auth.varify(model).subscribe(res=>{
      if(res.state==true){
        this.loader = false;
        alert("Password set successfully")
        this._router.navigate(['/signin']);
      }else{
        this.loader = false;
        alert(res.message)
      }
    })


  }

  signin(){
    this._router.navigate(['/signin']);
  }

}
