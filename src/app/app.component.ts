import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  islogin:boolean = true;
  sideBar = '';

  async ngOnInit() {
    this.authManager();   
  }
  constructor(private _common:Router){}

  // Check user is login or as per role redirect to dashboard (admin or user) 
  async authManager(){  
    const token = localStorage.getItem('token')??'';
    if (token) {
      this.islogin = true;
      const Tokerole:any = jwtDecode(token);
      console.log("token Extact =", Tokerole);
      this.sideBar = Tokerole.role;
      if(this.sideBar === 'admin'){
        this._common.navigate(['/dashboard']);
        
      } else if(this.sideBar === 'user'){
        this._common.navigate(['/dashboard']);
      }
    } else {
      this.islogin = false;
      this._common.navigate(['/signin']);
      localStorage.clear();
    }
  }

  isShown:any;
  dropdown(){ 
    this.isShown = !this.isShown;
  }
  logout(){
    localStorage.removeItem('token');
    window.location.reload();
    localStorage.clear();
  }

}
