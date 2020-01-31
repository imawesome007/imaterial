import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignINDetailLists } from "../../../shared/models/signIn/signIn-detail-list";
import { from } from 'rxjs';
import { SignInSignupService } from 'src/app/shared/services/signupSignin/signupSignin.service';


export interface OrganisationType{
  value: string;
  viewValue: string;
}

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["../../../../assets/scss/main.scss"]
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private signInSignupService :SignInSignupService
  ) {}
  signupForm: FormGroup;
  signInDetails={} as SignINDetailLists ;
  ngOnInit() {
    this.formInit();
  }

  organisationTypes: OrganisationType[] = [
    { value: "Contractor", viewValue: "Contractor"},
    { value: "Supplier", viewValue: "Supplier"},
  ]


  formInit() {
   this.signupForm = this.formBuilder.group({
    firstName: ["First Name",Validators.required],
    lastName: ["Last name",Validators.required],
    email: ["email@buildsupply.com",Validators.required],
    phone: ["123456790",Validators.required],
    organisationName: ["organisationName",Validators.required],
    organisationType: ["",Validators.required],
    password: ["string",Validators.required],
    confirmPassword: ["string",Validators.required]

   });
   console.log("details", this.signupForm.value);
  }
   signup(){
    // this.signInDetails =  this.signupForm.value;
    this.signInDetails.firstName = this.signupForm.value.firstName
    this.signInDetails.lastName = this.signupForm.value.lastName
    this.signInDetails.password = this.signupForm.value.password
    this.signInDetails.confirmPassword = this.signupForm.value.confirmPassword
    this.signInDetails.phone = this.signupForm.value.phone
    this.signInDetails.clientId=  "fooClientIdPassword"
    this.signInDetails.customData = {organizationName :this.signupForm.value.organisationName,
   organizationType :this.signupForm.value.organisationType}
   this.signInSignupService.signUp(this.signInDetails).then(data => {
     console.log(data.data.serviceRawResponse.data)
     localStorage.setItem('Role', data.data.serviceRawResponse.data.Role);
     localStorage.setItem('ServiceToken', data.data.serviceRawResponse.data.serviceToken);
     localStorage.setItem('userId', data.data.serviceRawResponse.data.userId);
     localStorage.setItem('orgId', data.data.serviceRawResponse.data.orgId);
    //  this.router.navigate(["/bom/" + this.projectId + "/bom-detail"]);
  });
// console.log("filled values", this.signInDetails);



   }
}


