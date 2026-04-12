import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { StdManagService } from '../std-manag.service';
import moment from 'moment';
import { ConfigService } from '../../Configrations/config.service';
import { urls } from '../../../common/common';
// import { v4 as uuidv4 } from 'uuid';


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
  isButtonClicked: boolean = true;
  data: any[] = [];
  keyboard: string = 'FirstName';
  url:string = new urls().webApiUrl;


  constructor(private _stdManagService: StdManagService, private _configService: ConfigService, private _fb: FormBuilder) {}

    ngOnInit() {
      this.Init();
      this.Allot();
    }

    Init(){
      this.addStudentForm = this._fb.group({
        AdmissionId: [0],
        StrudnetTran: [''],
        AdmissionDate: [''],
        ClassGenId: [0],
        FirstName: [''],
        LastName: [''],
        Gender: ['female'],
        DateOfBirth: [''],
        UID: [''],
        BloodGroup: [''],
        AddressLine1: [''],
        Landmark: [''],
        City: [''],
        State: [''],
        PinCode: [''],
        facility1: [true],
        facility2: [false],
        facility3: [false],
        facility4: [false],
        StudyMode: [''],
        FatherName: [''],
        MotherName: [''],
        GuardianName: [''],
        Religtion: ['Sikh'],
        Caste: ['GEN'],
        PrimaryContact: [''],
        SecondaryContact: [''],
        ParentsEmail: [''],
        id_proof: [''],
        marksheet: [''],
        guardian_id_proof: ['']
      });
    }


    // Auto Complete -- OPEN
    isOldStudent:any;
    img1:any;
    img2:any;
    img3:any;
    img4:any;
    selectEvent(item:any){
      if(item.ClassGenId){
        this.ViewFasilityLs(item.ClassGenId); // view fasility
        let FeeLsId = item.FeeLsId.split(',').map((id: string) => id.trim()); // Extrac Ls
        console.log(FeeLsId);
        // ImagePath
        this.img1 = this.url+'wwwroot/'+item.StudnetPhoto;
        this.img2 = this.url+'wwwroot/'+item.AdharCardPath;
        this.img3 = this.url+'wwwroot/'+item.LastYearReportCardPath;
        this.img4 = this.url+'wwwroot/'+item.GuardianIDPath;

        this.isOldStudent = item.AdmissionId;

      }
      
      this.addStudentForm.patchValue({
        StrudnetTran: item.AdmissionId,
        AdmissionDate: moment(item.AdmissionDate).format('YYYY-MM-DD'),
        DateOfBirth: moment(item.DateOfBirth).format('YYYY-MM-DD'),
        ClassGenId: item.ClassGenId,
        FirstName: item.FirstName,
        LastName: item.LastName,
        Gender: item.Gender,
        UID: item.UID,
        BloodGroup: item.BloodGroup,
        // P2
        AddressLine1: item.AddressLine1,
        Landmark: item.Landmark,
        City: item.City,
        State: item.State,
        PinCode: item.PinCode,

        // P3

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




  // Class k selection par Fee Fess list and ClassId for submitForm
  ClassValue:any;
  FacilityFee:any=[];
  StudentTranId:any;
  dataChange(a:any){
    const select = a.target as HTMLSelectElement;
    if(this.isOldStudent==undefined){
      let data = select.options[select.selectedIndex].text;
      this.StudentTranId = "Std.Sr1/"+data;
    }
    this.ViewFasilityLs(a.target.value);
  }
  ViewFasilityLs(a:any){
    this.ClassValue = a;
    this.FacilityFee =this.ClassLs.find((a:any)=>a.GenClassKey==this.ClassValue);
    this._configService.viewFeeStract().subscribe(res=>{
      let records = res.data.filter((a:any) => a.ClassId == this.FacilityFee.ClassId);
      this.FacilityFee = records;
    })
  }

  // Get Fasilitys list for form
  facilities: any = [];
  facilitiesCheck(a: any, event: any) {
    if (event.target.checked) {
      this.facilities.push(a);
    } else {
      this.facilities = this.facilities.filter((x:any) => x !== a);
    }
    let datW = [...new Set(this.facilities)];
    console.log(datW);
  }

  // Uploaded Files Memorys
  StdPhoto:any;
  StdId:any;
  StdMarkSheet:any;
  GuardinId:any;
  fileUpdate(event:any){
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0){
      const file = input.files[0];
       switch (input.name) {
        case "StudnetPhoto":
          this.StdPhoto = file;
          break;
        case "StudentIdCard":
          this.StdId = file;
          break;
        case "StudentPreMark":
          this.StdMarkSheet = file;
          break;
        case "GuardianId":
          this.GuardinId = file;
          break;
        default:
          alert("Unknown file uploaded");
      }
    }
  }


  onSubmit(){
    const FileData = new FormData();
    FileData.append("StrudnetTran", this.addStudentForm.value.StrudnetTran || this.StudentTranId);
    // FileData.append("AdmissionDate", moment(this.addStudentForm.value.AdmissionDate).format('YYYY-MM-DD'));
    FileData.append("AdmissionDate", this.addStudentForm.value.AdmissionDate ? moment(this.addStudentForm.value.AdmissionDate).format('YYYY-MM-DD') : "");
    // FileData.append("ClassGenId", this.ClassValue??0);
    FileData.append("ClassGenId", (this.ClassValue ?? 0).toString());
    FileData.append("FirstName", this.addStudentForm.value.FirstName);
    FileData.append("LastName", this.addStudentForm.value.LastName);
    FileData.append("Gender", this.addStudentForm.value.Gender);
    // FileData.append("DateOfBirth", moment(this.addStudentForm.value.DateOfBirth).format('YYYY-MM-DD'));
    FileData.append("DateOfBirth", this.addStudentForm.value.DateOfBirth ? moment(this.addStudentForm.value.DateOfBirth).format('YYYY-MM-DD') : "");
    // FileData.append("UID", this.addStudentForm.value.UID);
    FileData.append("UID", this.addStudentForm.value.UID ? this.addStudentForm.value.UID.toString() : "0");
    FileData.append("BloodGroup", this.addStudentForm.value.BloodGroup);
    FileData.append("AddressLine1", this.addStudentForm.value.AddressLine1);
    FileData.append("Landmark", this.addStudentForm.value.Landmark);
    FileData.append("City", this.addStudentForm.value.City);
    FileData.append("State", this.addStudentForm.value.State);
    FileData.append("PinCode", this.addStudentForm.value.PinCode);
    FileData.append("FeeLsId", this.facilities.join(","));
    FileData.append("StudyMode", this.addStudentForm.value.StudyMode);
    FileData.append("FatherName", this.addStudentForm.value.FatherName);
    FileData.append("MotherName", this.addStudentForm.value.MotherName);
    FileData.append("GuardianName", this.addStudentForm.value.GuardianName);
    FileData.append("Religtion", this.addStudentForm.value.Religtion);
    FileData.append("Caste", this.addStudentForm.value.Caste);
    FileData.append("PrimaryContact", this.addStudentForm.value.PrimaryContact);
    FileData.append("SecondaryContact", this.addStudentForm.value.SecondaryContact);
    FileData.append("ParentsEmail", this.addStudentForm.value.ParentsEmail);
    if (this.StdId) FileData.append("AdharCardPath", this.StdId);
    if (this.StdMarkSheet) FileData.append("LastYearReportCardPath", this.StdMarkSheet);
    if (this.GuardinId) FileData.append("GuardianIDPath", this.GuardinId);
    if (this.StdPhoto) FileData.append("StudnetPhoto", this.StdPhoto); 
    
    if(this.isButtonClicked){
      // Call API to add student
      // TEST
      FileData.forEach((value, key) => {
        console.log(key, value);
        if (value instanceof File) {
          console.log("File Name:", value.name);
        }
      });
      this._stdManagService.AddStudentComponent(FileData).subscribe(res=>{
        alert(res.message);
      },(err:any)=>{
        alert(err.message);
      })
    }else{
      // Call API to update student
      this._stdManagService.UpdateStudentComponent(FileData).subscribe(res=>{
        alert(res.message);
      },(err:any)=>{
        alert(err.message);
      })
    }
  }

  // Delete Studnet
  deleteApplication(){
    this._stdManagService.DeleteStudentComponent(this.isOldStudent).subscribe(res=>{
      alert(res.message);
    },(err:any)=>{
      alert(err.message);
    })
  }

  ClassLs:any;
  Allot(){
   this._configService.viewGenClass().subscribe(res=>{
    this.ClassLs = res.data;
   })

   this._stdManagService.AllStudentRecord().subscribe(res=>{
    this.data = res.data;
   })
  }
  clear(){
    this.addStudentForm.reset();
    this.isButtonClicked = true;
  }

}
