import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fee-collection',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './fee-collection.component.html',
  styleUrl: './fee-collection.component.css'
})
export class FeeCollectionComponent {

  AllClassRec:any = [];
  ngOnInit(){
    this.Allot();
  }
  constructor(){}



  // Get Data
  Allot(){
    
  }

  // Filter via Keywords
  nameFilter(keyword:any){

  }

  // Fiter via ClassId 
  classChange(id:any){

  }

}
