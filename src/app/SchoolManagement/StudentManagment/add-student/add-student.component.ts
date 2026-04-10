import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { StdManagService } from '../std-manag.service';
import moment from 'moment';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
  providers: [StdManagService],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  addStudentForm!: FormGroup;
  isButtonClicked: boolean = false;
  data: any[] = [];
  keyboard: string = 'firstName';


  constructor(private stdManagService: StdManagService, private _fb: FormBuilder) {}

  ngOnInit() {
    this.addStudentForm = this._fb.group({
      AddmissionNumber: ['',Validators.required],
      dateOfAdmission: ['',Validators.required],
      ClassId: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      gender: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      adharCard: ['',Validators.required],
      bloodGroup: ['',Validators.required],
      street: ['',Validators.required],
      areaLandmark: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      pinCode: ['',Validators.required],
      facility1: ['',Validators.required],
      facility2: ['',Validators.required],
      facility3: ['',Validators.required],
      facility4: ['',Validators.required],
      StudyMode: ['',Validators.required],
      FatherName: ['',Validators.required],
      MotherName: ['',Validators.required],
      ParentName: ['',Validators.required],
      Relation: ['',Validators.required],
      Category: ['',Validators.required],
      parent_phone: ['',Validators.required],
      other_phone: ['',Validators.required],
      parent_email: ['',Validators.required],
      id_proof: ['',Validators.required],
      marksheet: ['',Validators.required],
      guardian_id_proof: ['',Validators.required]
    });
  }


    // Auto Complete -- OPEN
  selectEvent(item:any){
    this.addStudentForm.patchValue({
      AddmissionNumber: item.AddmissionNumber,
      dateOfAdmission: item.dateOfAdmission,
      ClassId: item.ClassId,
      firstName: item.firstName,
      lastName: item.lastName,
      gender: item.gender,
      dateOfBirth: item.dateOfBirth,
      adharCard: item.adharCard,
      bloodGroup: item.bloodGroup,
      street: item.street,
      areaLandmark: item.areaLandmark,
      city: item.city,
      state: item.state,
      pinCode: item.pinCode,
      facility1: item.facility1,
      facility2: item.facility2,
      facility3: item.facility3,
      facility4: item.facility4,
      StudyMode: item.StudyMode,
      FatherName: item.FatherName,
      MotherName: item.MotherName,
      ParentName: item.ParentName,
      Relation: item.Relation,
      Category: item.Category,
      parent_phone: item.parent_phone,
      other_phone: item.other_phone,
      parent_email: item.parent_email,
      id_proof: item.id_proof,
      marksheet: item.marksheet,
      guardian_id_proof: item.guardian_id_proof,
    });
    this.isButtonClicked = false; 
  }
  onChangeSearch(val: string) {}
  onFocused(e:any){}
  // Auto Complete -- CLOSE

  onSubmit(){
    if(!this.addStudentForm.valid){
      alert("Please fill all the required fields.");
      return;
    }
    let model = {
      AddmissionNumber: this.addStudentForm.value.AddmissionNumber,
      dateOfAdmission: moment(this.addStudentForm.value.dateOfAdmission).format('YYYY-MM-DD'),
      ClassId: this.addStudentForm.value.ClassId,
      firstName: this.addStudentForm.value.firstName,
      lastName: this.addStudentForm.value.lastName,
      gender: this.addStudentForm.value,
      dateOfBirth: moment(this.addStudentForm.value.dateOfBirth).format('YYYY-MM-DD'),
      adharCard: this.addStudentForm.value.adharCard,
      bloodGroup: this.addStudentForm.value.bloodGroup,
      street: this.addStudentForm.value.street,
      areaLandmark: this.addStudentForm.value.areaLandmark,
      city: this.addStudentForm.value.city,
      state: this.addStudentForm.value.state,
      pinCode: this.addStudentForm.value.pinCode,
      facility1: this.addStudentForm.value.facility1,
      facility2: this.addStudentForm.value.facility2,
      facility3: this.addStudentForm.value.facility3,
      facility4: this.addStudentForm.value.facility4,
      StudyMode: this.addStudentForm.value.StudyMode,
      FatherName: this.addStudentForm.value.FatherName,
      MotherName: this.addStudentForm.value.MotherName,
      ParentName: this.addStudentForm.value.ParentName,
      Relation: this.addStudentForm.value.Relation,
      Category: this.addStudentForm.value.Category,
      parent_phone: this.addStudentForm.value.parent_phone,
      other_phone: this.addStudentForm.value.other_phone,
      parent_email: this.addStudentForm.value.parent_email,
      id_proof: this.addStudentForm.value.id_proof,
      marksheet: this.addStudentForm.value.marksheet,
      guardian_id_proof: this.addStudentForm.value.guardian_id_proof
    };
    if(this.isButtonClicked){
      // Call API to add student
      console.log("Adding student:", model);
    }else{
      // Call API to update student
      console.log("Updating student:", model);
    }
  }
  deleteApplication(){}

  clear(){
    this.addStudentForm.reset();
    this.isButtonClicked = true;
  }

}
