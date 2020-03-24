import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SignINDetailLists } from "../../../shared/models/signIn/signIn-detail-list";
import { SignInSignupService } from "src/app/shared/services/signupSignin/signupSignin.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FieldRegExConst } from "src/app/shared/constants/field-regex-constants";
import { UserService } from "src/app/shared/services/userDashboard/user.service";
import { UserDetails } from 'src/app/shared/models/user-details';
import { MatSnackBar } from '@angular/material';
import { TokenService } from 'src/app/shared/services/token.service';
import { auth } from 'src/app/shared/models/auth';
import { debounceTime } from 'rxjs/operators';

export interface OrganisationType {
  value: string;
  viewValue: string;
}

@Component({
  selector: "signup",
  templateUrl: "./signup.component.html"
})

export class SignupComponent implements OnInit {
  showPassWordString: boolean = false;
  uniqueCode: string = "";
  user: UserDetails;
  lessOTPDigits: boolean;
  showOtp: boolean = false;
  emailVerified: boolean = true;
  emailMessage: string;
  otpLength: number = 0;

  constructor(
    private tokenService: TokenService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private signInSignupService: SignInSignupService,
    private _userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  signupForm: FormGroup;
  signInDetails = {} as SignINDetailLists;

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.uniqueCode = param["uniqueCode"];
      if (this.uniqueCode) {
        this.getUserInfo(this.uniqueCode);
      } else {
        this.formInit();
      }
    });
    // let urlLength = this.router.url.toString().length;
    // let lastSlash = this.router.url.toString().lastIndexOf("/");
    // this.uniqueCode = this.router.url.toString().slice(lastSlash, urlLength);
  }

  getUserInfo(code) {
    this._userService.getUserInfoUniqueCode(code).then(res => {
      this.user = res.data[0];
      this.formInit();
    });
  }

  organisationTypes: OrganisationType[] = [
    { value: "Contractor", viewValue: "Contractor" },
    { value: "Supplier", viewValue: "Supplier" }
  ];

  formInit() {
    this.signupForm = this.formBuilder.group({
      email: [this.user ? this.user.email : '', [Validators.required, Validators.pattern(FieldRegExConst.EMAIL)]],
      phone: [this.user ? this.user.contactNo : '', [Validators.required, Validators.pattern(FieldRegExConst.PHONE)]],
      organisationName: [this.user ? this.user.companyName : '', Validators.required],
      organisationType: ["Contractor", Validators.required],
      password: ["", Validators.required],
      otp: ["", [Validators.required]]
    });

    if (this.user && this.user.contactNo && this.user.contactNo.length === 10) {
      this.enterPhone(event, this.user.contactNo)
    }
  }

  signup() {
    this.signInDetails.password = this.signupForm.value.password;
    this.signInDetails.confirmPassword = this.signupForm.value.password;
    this.signInDetails.phone = this.signupForm.value.phone;
    this.signInDetails.email = this.signupForm.value.email;
    this.signInDetails.clientId = "fooClientIdPassword";
    if (this.uniqueCode) {
      this.signInDetails.firstName = this.user.firstName ? this.user.firstName : null;
      this.signInDetails.lastName = this.user.lastName ? this.user.lastName : null;
    }
    this.signInDetails.customData = {
      uniqueCode: this.uniqueCode !== "" ? this.uniqueCode : null,
      organizationName: this.signupForm.value.organisationName,
      organizationType: this.signupForm.value.organisationType,
      organizationId: this.user ? this.user.organizationId.toString() : null,
      userId: this.user ? this.user.userId.toString() : null,

      // organizationId: this.user ? this.user.organizationId : 0,
      // userId: this.user ? this.user.userId : 0
    };

    this.signInSignupService.signUp(this.signInDetails).then(data => {
      if (data.status === 1002) {
        this._snackBar.open("Phone Number already used", "", {
          duration: 2000,
          panelClass: ["warning-snackbar"],
          verticalPosition: "top"
        });
      }
      else if (data.data.serviceRawResponse.data as auth) {
        this.tokenService.setAuthResponseData(data.data.serviceRawResponse.data)
        // localStorage.setItem("role", data.data.serviceRawResponse.data.role);
        // localStorage.setItem("accessToken", data.data.serviceRawResponse.data.serviceToken);
        // localStorage.setItem("userId", data.data.serviceRawResponse.data.userId);
        // localStorage.setItem("orgId", data.data.serviceRawResponse.data.orgId);

        // if (data.data.serviceRawResponse.data.role || this.uniqueCode !== "") {
        if (this.uniqueCode) {
          this.router.navigate(["/dashboard"]);
        } else {
          // this.router.navigate(["/profile/update-info"]);
          this.router.navigate(["/profile/terms-conditions"]);
        }
      }
    });
  }

  showPassWord() {
    if (!this.showPassWordString) {
      this.showPassWordString = true;
    } else {
      this.showPassWordString = false;
    }
  }
  enterPhone(event, numberPassed?: string) {
    this.lessOTPDigits = false;
    const value = numberPassed ? numberPassed : event.target.value;
    if ((value.match(FieldRegExConst.PHONE)) && (value.length == 10)) {
      this.signInSignupService.sendOTP(value).then(res => {
        if (res.data)
          this.showOtp = res.data.success;
          this._snackBar.open("OTP has been sent on your phone number", "", {
            duration: 2000,
            panelClass: ["success-snackbar"],
            verticalPosition: "top"
          });
      });
    }
  }
  enterOTP(event) {
    const otp = event.target.value
    if (event.target.value.length == 4) {
      this.otpLength = event.target.value.length;
      this.signInSignupService.verifyOTP(this.signupForm.value.phone, otp).then(res => {
        if (res.data) {
          this.lessOTPDigits = res.data.success;
        }
      });
    }
  }
  verifyEmail(event) {
    const email = event.target.value
    if (email.match(FieldRegExConst.EMAIL)) {
      this.signInSignupService.verifyEMAIL(this.signupForm.value.email).then(res => {
        if (res) {
          this.emailVerified = res.data;
          this.emailMessage = res.message;
        }
      });
    }
  }


}

