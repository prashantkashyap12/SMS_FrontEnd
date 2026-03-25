import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers:[UserAuthService],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  constructor(private _Router:Router, private _auth:UserAuthService, private _fb:FormBuilder){}
  ngOnInit(): void {
    this.Init();
  }

  signupForm!:FormGroup;
  loader:boolean =false;
  mainWeb:any ; // imgPath

   Init(){
    this.signupForm = this._fb.group({
      email:['', Validators.email],
      password:['', Validators.required],
    });
  }

  Ismodel(){
    return {
      email: this.signupForm.value.email ?? '',
      password: this.signupForm.value.password ?? '',
    }
  }
  routForgt(){
    this._Router.navigate(['/forget'])
  }
  signup(){
    this._Router.navigate(['/signup'])
  }
  onSubmit(){
    this.loader = true;
    if(!this.signupForm.valid){
      alert("form is not Valid");
      this.loader = false;
      return
    }
    let model = this.Ismodel();
    this._auth.signIn(model).subscribe(res=>{
      if(res.state == true){
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('Name', res.data.name);
        localStorage.setItem('email', this.signupForm.value.email);
        localStorage.setItem('password', this.signupForm.value.password);
        localStorage.setItem('token', res.token);
        localStorage.setItem('contact', res.data.contact);
        localStorage.setItem('expiryDate', res.data.expiryDate);
        this.loader = false;
        window.location.reload();
      }else{
        this.loader = false;
        alert(res.message);
      }
    })
  }
















  sign(val:any){
    val=='forget' ? this._Router.navigate(['/forget-password']) : this._Router.navigate(['/signup']);
  }


}
