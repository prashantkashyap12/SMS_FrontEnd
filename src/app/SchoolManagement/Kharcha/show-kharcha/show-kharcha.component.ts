import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-show-kharcha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-kharcha.component.html',
  styleUrl: './show-kharcha.component.css'
})
export class ShowKharchaComponent {

  data:any = [];
}
