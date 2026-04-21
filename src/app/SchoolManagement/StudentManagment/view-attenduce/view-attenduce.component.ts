import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-view-attenduce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-attenduce.component.html',
  styleUrl: './view-attenduce.component.css'
})
export class ViewAttenduceComponent {

  isDayWise = true;
  formChange(a:any){
    if(a == 'Month'){
      this.isDayWise = true;
    }else if(a == 'Day'){
      this.isDayWise = false;
    }
  }

  onSubmit(a:any){
    if(a == 'Month'){
      this.isDayWise = true;
    }else if(a == 'Day'){
      this.isDayWise = false;
    }
  }

  //  attenduce data student ka monthly - teacherId, classId, month, StudentId
  //  attencduce data class ka daily - TeacherId, Date



}
