import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  providers:[UserAuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  loader:boolean =false;
  userSignup!: FormGroup;

  constructor(private _router:Router,
    private _fb:FormBuilder, 
    private _auth:UserAuthService 
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  // Define Form Controller
  initForm(){
    this.userSignup = this._fb.group({
      date: [moment(new Date()).format("DD-MM-YYYY")],
      name:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.maxLength(10)]], //Validators.pattern(/^[0-9]{10}$/)]
      password: ['', [Validators.required, Validators.minLength(6)]],
      role:['user', [Validators.required]]
    });
  }

   // Data before save validation Model 
  datamodel(){
    return {
      tdate: new Date(),
      name: this.userSignup.value.name ?? '',
      email: this.userSignup.value.email ?? '',
      contact: this.userSignup.value.contact ?? '',
      password: this.userSignup.value.password ?? '',
      role: this.userSignup.value.role ?? 'user',
    };
  }

  // onSubmit button
  onSubmit(){
    this.loader = true;
    const model= this.datamodel(); 
    this._auth.signup(model).subscribe(
    res=>{ 
      if(res.state == true){
      this.loader = false;
      localStorage.setItem('email', this.userSignup.value.email);
      localStorage.setItem('password', this.userSignup.value.password);
      localStorage.setItem('user', this.userSignup.value.name);
      localStorage.setItem('role', this.userSignup.value.role);
      this._router.navigate(['/verify']);
      }else{
      this.loader = false;
      alert(res.message)
      }
    });
  }













  route(){
    this._router.navigate(['/signin']);
  }
}
