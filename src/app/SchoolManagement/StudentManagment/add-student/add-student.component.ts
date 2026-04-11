import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { StdManagService } from '../std-manag.service';
import moment from 'moment';
import { ConfigService } from '../../Configrations/config.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
  providers: [StdManagService, ConfigService],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {

  addStudentForm!: FormGroup;
  isButtonClicked: boolean = false;
  data: any[] = [];
  keyboard: string = 'firstName';


  constructor(private _stdManagService: StdManagService, private _configService: ConfigService, private _fb: FormBuilder) {}

    ngOnInit() {
      this.Init();
      this.Allot();
    }

    Init(){
      this.addStudentForm = this._fb.group({
        AdmissionId: [0],
        // P1
        StrudnetTran: [''],
        AdmissionDate: [''],
        ClassGenId: [0],
        FirstName: [''],
        LastName: [''],
        Gender: ['male'],
        DateOfBirth: [''],
        UID: [''],
        BloodGroup: [''],

        // P2
        AddressLine1: [''],
        Landmark: [''],
        City: [''],
        State: [''],
        PinCode: [''],

        // P3
        facility1: [true],
        facility2: [false],
        facility3: [false],
        facility4: [false],
        StudyMode: [''],


        // P4
        FatherName: [''],
        MotherName: [''],
        GuardianName: [''],
        Religtion: ['Hindu'],
        Caste: ['Hindu'],
        PrimaryContact: [''],
        SecondaryContact: [''],
        ParentsEmail: [''],

        // P5
        id_proof: [''],
        marksheet: [''],
        guardian_id_proof: ['']
      });
    }


    // Auto Complete -- OPEN
  selectEvent(item:any){
    let FeeLsId = item.FeeLsId.split(',').map((id: string) => id.trim());
    this.addStudentForm.patchValue({
      StrudnetTran: item.StrudnetTran,
      AdmissionDate: item.AdmissionDate,
      ClassGenId: item.ClassGenId,
      FirstName: item.FirstName,
      LastName: item.LastName,
      Gender: item.Gender,
      DateOfBirth: item.DateOfBirth,
      UID: item.UID,
      BloodGroup: item.BloodGroup,
      // P2
      AddressLine1: item.AddressLine1,
      Landmark: item.Landmark,
      City: item.City,
      State: item.State,
      PinCode: item.PinCode,

      // P3
      facility1: FeeLsId[0] || '',
      facility2: FeeLsId[1] || '',
      facility3: FeeLsId[2] || '',
      facility4: FeeLsId[3] || '',
      StudyMode: item.StudyMode,

      // P4
      FatherName: item.FatherName,
      MotherName: item.MotherName,
      GuardianName: item.GuardianName,
      Religtion: item.Religtion,
      Caste: item.Caste,
      PrimaryContact: item.PrimaryContact,
      SecondaryContact: item.SecondaryContact,
      ParentsEmail: item.ParentsEmail,
      // P5
      id_proof: item.id_proof,
      marksheet: item.marksheet,
      guardian_id_proof: item.guardian_id_proof,
    });
    this.isButtonClicked = false; 
  }
  onChangeSearch(val: string) {}
  onFocused(e:any){}
  // Auto Complete -- CLOSE





  ClassValue:any;
  dataChange(a:any){
    this.ClassValue = a.target.value;
  }
  facilities:any;

  // Make StudentTranId
  StudentTranId:any = "";
 

  onSubmit(){
    // if(!this.addStudentForm.valid){
    //   alert("Please fill all the required fields.");
    //   return;
    // }
    
    // this.StudentTranId = this.addStudentForm.value.FirstName.substring(0, 2).toUpperCase() + this.addStudentForm.value.ClassGenId.toString().toUpperCase() + Math.floor(1000 + Math.random() * 9000); 

    // marged Facility
    let facility1 = this.addStudentForm.value.facility1 ??'';
    let facility2 = this.addStudentForm.value.facility2 ??'';
    let facility3 = this.addStudentForm.value.facility3 ??'';
    let facility4 = this.addStudentForm.value.facility4 ??'';
    this.facilities = [facility1, facility2, facility3, facility4].filter(facility => facility !== '').join(', ').toString();  




    let model = {
      StrudnetTran: this.addStudentForm.value.StrudnetTran ?? Math.floor(1000 + Math.random() * 9000),
      AdmissionDate: moment(this.addStudentForm.value.AdmissionDate).format('YYYY-MM-DD'),
      ClassGenId: this.ClassValue.toString(),
      FirstName: this.addStudentForm.value.FirstName,
      LastName: this.addStudentForm.value.LastName,
      Gender: this.addStudentForm.value.Gender,
      DateOfBirth: moment(this.addStudentForm.value.DateOfBirth).format('YYYY-MM-DD'),
      UID: this.addStudentForm.value.UID,
      BloodGroup: this.addStudentForm.value.BloodGroup,

      AddressLine1: this.addStudentForm.value.AddressLine1,
      Landmark: this.addStudentForm.value.Landmark,
      City: this.addStudentForm.value.City,
      State: this.addStudentForm.value.State,
      PinCode: this.addStudentForm.value.PinCode,

      FeeLsId: this.facilities,
      StudyMode: this.addStudentForm.value.StudyMode,

      FatherName: this.addStudentForm.value.FatherName,
      MotherName: this.addStudentForm.value.MotherName,
      GuardianName: this.addStudentForm.value.GuardianName,
      Religtion: this.addStudentForm.value.Religtion,
      Caste: this.addStudentForm.value.Caste,
      PrimaryContact: this.addStudentForm.value.PrimaryContact,
      SecondaryContact: this.addStudentForm.value.SecondaryContact,
      ParentsEmail: this.addStudentForm.value.ParentsEmail,

      id_proof: this.addStudentForm.value.id_proof,
      marksheet: this.addStudentForm.value.marksheet,
      guardian_id_proof: this.addStudentForm.value.guardian_id_proof,
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


  ClassLs:any;
  Allot(){
   this._configService.viewGenClass().subscribe(res=>{
    this.ClassLs = res.data;
   })

  }
  clear(){
    this.addStudentForm.reset();
    this.isButtonClicked = true;
  }

}
