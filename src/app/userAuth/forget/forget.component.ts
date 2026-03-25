import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
   providers:[UserAuthService],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css'
})
export class ForgetComponent {
  loader:boolean = false;
  forgetForm!: FormGroup;
  constructor(private _router:Router, private _fb: FormBuilder, private _auth:UserAuthService) { }
  ngOnInit() {
    this.initForm()
  }
  
  initForm(){
    this.forgetForm = this._fb.group({
      email: ['', [Validators.email]],
    })
  }

  modelValidation() {
    return {
      email: this.forgetForm.value.email ?? ''
    }
  }
  onSubmit(){
    this.loader = true;
    if(this.forgetForm.invalid){
      this.loader = false;
      return this.forgetForm.markAllAsTouched();
    }else{
      let model = this.modelValidation();
      this._auth.forget(model).subscribe(res => {
        if(res.state == true){
          this.loader = false;
          alert("OTP Sent on your Email");
          localStorage.clear();
          localStorage.setItem('email', this.forgetForm.value.email);
          localStorage.setItem('password', this.forgetForm.value.password ?? '000000');
          this._router.navigate(['/verify']);
        }else{
          this.loader = false;
          alert(res.massage)
        }
      })
    }
  }




  route(){
    this._router.navigate(['/signin']);
  }

}
