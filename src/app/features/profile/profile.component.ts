import { OnInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRoles, UserDetails, TradeList, TurnOverList } from 'src/app/shared/models/user-details';
import { Router } from '@angular/router';
import { DocumentUploadService } from 'src/app/shared/services/document-download/document-download.service';
import { UserService } from 'src/app/shared/services/userDashboard/user.service';
import { MatSnackBar } from '@angular/material';
import { Currency, CountryCode } from 'src/app/shared/models/currency';
import { CommonService } from 'src/app/shared/services/commonService';
import { FieldRegExConst } from 'src/app/shared/constants/field-regex-constants';

export interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
  searchCountry: string = '';
  roles: UserRoles[];
  userInfoForm: FormGroup;
  customTrade: FormGroup;
  users: UserDetails;
  tradeList: TradeList[] = [];
  turnOverList: TurnOverList;
  selectedTrades: TradeList[] = [];
  localImg: string | ArrayBuffer;
  filename: string;
  role: string;
  roleId: number;
  cities: City[] = [
    { value: "Gurgaon", viewValue: "Gurgaon" },
    { value: "Delhi", viewValue: "Delhi" },
    { value: "Karnal", viewValue: "Karnal" }
  ];
  selectedTradesId: number[] = [];
  usersTrade: number[] = [];
  OthersId: any;
  url: any;
  userId
  imageFileSizeError: string = "";
  imageFileSizeCheck: boolean = true;
  fileTypes: string[] = ['png', 'jpeg', 'jpg'];
  tradeDescription: string;
  currencyList: Currency[] = [];
  countryList: CountryCode[] = [];
  livingCountry: CountryCode[] = [];
  baseCurrency
  countryCode: string;
  validPincode: boolean = false;
  countryId: Number;
  constructor(private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private commonService: CommonService,
    private _uploadImageService: DocumentUploadService) { }

  ngOnInit() {
    this.userId = localStorage.getItem("userId");
    this.role = localStorage.getItem("role");
    this.formInit();
    this.getUserRoles();
    this.countryId = Number(localStorage.getItem('countryId'))
    this.countryCode = localStorage.getItem('countryCode')
    // this.getUserInformation(userId);
    this.getTurnOverList();
    this.getCurrencyAndCountry();
    // this.getCountryCode();
  }

  getBaseCurrency() {
    this.commonService.getBaseCurrency().then(res => {
      this.userInfoForm.get('baseCurrency').setValue(res.data)
    })
  }

  getUserRoles() {
    this._userService.getRoles().then(res => {
      this.roles = res.data;
      this.roles.splice(2, 1);
      const id = this.roles.filter(opt => opt.roleName === this.role);
      this.roleId = id[0].roleId;
    })
  }

  getCurrencyAndCountry() {
    Promise.all([
      this.commonService.getCurrency(),
      this.commonService.getCountry()
    ]).then(res => {
      this.currencyList = res[0].data;
      this.countryList = res[1].data;
      this.getUserInformation(this.userId);
    })
  }

  getUserInformation(userId) {
    this._userService.getUserInfo(userId).then(res => {
      this.users = res.data ? res.data[0] : null;
      if (res.data[0].trade) {
        res.data[0].trade.forEach(element => {
          this.usersTrade.push(element.tradeId);
          if (element.tradeId == 13) {
            if (element.tradeDescription)
              this.tradeDescription = element.tradeDescription;
          }
        });
        this.getTradesList();
      }
      this.formInit();
      this.setCountryAndCurrency()
    });
  }

  setCountryAndCurrency() {
    this.livingCountry = this.countryList.filter(val => {
      return val.countryId === Number(this.users.countryId);
    })
    let newCurrencyList = this.currencyList.filter(val => {
      return val.currencyId === this.users.baseCurrency.currencyId;
    })
    this.userInfoForm.get('baseCurrency').setValue(newCurrencyList[0])
    this.userInfoForm.get('countryCode').setValue(this.livingCountry[0])
  }

  getTurnOverList() {
    this._userService.getTurnOverList().then(res => {
      let callingCode = localStorage.getItem('countryCode')
      this.turnOverList = res.data.filter(data => {
        if (callingCode === '+91' && data.isInternational === 0) {
          return data
        }
        else if (callingCode !== '+91' && data.isInternational === 1) {
          return data
        }
      })
    })
  }

  getTradesList() {
    this._userService.getTrades().then(res => {
      this.tradeList = res.data;

      if (res.data) {
        res.data.forEach(element => {
          if (element.tradeName == 'Others') {
            this.OthersId = element.tradeId;
          }
        });
      }

      if (this.tradeList) {
        this.tradeList.forEach(element => {
          for (let i = 0; i < this.usersTrade.length; i++) {
            if (this.usersTrade[i] == element.tradeId)
              element.selected = true;
          }
        });
      }
    })
  }


  get selectedCountry() {
    return this.userInfoForm.get('countryCode').value;
  }

  get selectedBaseCurrency() {
    return this.userInfoForm.get('baseCurrency').value;
  }

  formInit() {
    this.userInfoForm = this._formBuilder.group({
      baseCurrency: [{ value: '', disabled: true }],
      countryCode: [{ value: '', disabled: true }],
      organizationName: [this.users ? this.users.organizationName : ''],
      organizationId: [this.users ? this.users.organizationId : ''],
      firstName: [{ value: this.users ? this.users.firstName : '', disabled: false }, Validators.required],
      lastName: [{ value: this.users ? this.users.lastName : '', disabled: false }, Validators.required],
      email: [{ value: this.users ? this.users.email : '', disabled: true }, Validators.required],
      contactNo: [{ value: this.users ? this.users.contactNo : '', disabled: this.countryCode === "+91" ? true : false }, Validators.required],
      roleId: [{ value: this.users ? this.users.roleId : null, disabled: false }, Validators.required],
      turnOverId: [{ value: this.users ? this.users.TurnOverId : null, disabled: false }],
      roleDescription: [{ value: this.users ? this.users.roleDescription : null, disabled: false }],
      userId: [this.users ? this.users.userId : null],
      ssoId: [this.users ? this.users.ssoId : null],
      countryId: [],
      trade: [this.users ? this.users.trade : null],
      profileUrl: [''],
      orgPincode: [this.users ? this.users.orgPincode : null, [Validators.max(999999), Validators.pattern(FieldRegExConst.POSITIVE_NUMBERS)]]
    });
    this.customTrade = this._formBuilder.group({
      trade: []
    })
    this.userInfoForm.get('orgPincode').valueChanges.subscribe(val => {
      this.cityStateFetch(val)
    })
  }

  cityStateFetch(value) {
    this.commonService.getPincodeInternational(value, Number(this.countryId)).then(res => {
      if (res.data && res.data.length) {
        let city = res.data[0].districtName;
        let state = res.data[0].stateName;
        if (city && state)
          this.validPincode = true;
        else
          this.validPincode = false;

      }
      else {
        this.validPincode = false;
      }
    });
  }


  changeSelected(parameter: string, trade: TradeList) {
    let choosenIndex = -1;
    this.selectedTrades.forEach((trades, index) => {
      if (trades.tradeId === trade.tradeId) {
        choosenIndex = index;
      }
    })
    if (choosenIndex >= 0) {
      this.selectedTrades.splice(choosenIndex, 1);
    } else {
      this.selectedTrades.push(trade);
      if (trade.tradeId === this.OthersId) {
        this.customTrade.get("trade").enable()
      }
      else {
        this.customTrade.get("trade").disable()
      }
    }
    this.selectedTradesId = this.selectedTrades.map((trades: TradeList) => trades.tradeId).flat()
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      // reader.onload = (event) => {
      //   this.localImg = (<FileReader>event.target).result;
      // }
      const file = event.target.files[0];
      var fileSize = event.target.files[0].size; // in bytes
      let fileType = event.target.files[0].name.split('.').pop();

      if (this.fileTypes.some(element => {
        return element === fileType
      })) {
        if (fileSize < 1000000) {
          reader.onload = (event) => {
            this.localImg = (<FileReader>event.target).result;
          }
          this.imageFileSizeError = "";
          this.imageFileSizeCheck = true;
          this.uploadImage(file);
        }
        else {
          this.imageFileSizeCheck = false;
          this.imageFileSizeError = "Image must be less than 1 mb";
        }
      }
      else {
        if (this.localImg)
          this.localImg = this.localImg;
        else if (this.users.profileUrl)
          this.localImg = this.localImg;

        this._snackBar.open("We don't support " + fileType + " in Image upload, Please uplaod pdf, doc, docx, jpeg, png", "", {
          duration: 2000,
          panelClass: ["success-snackbar"],
          verticalPosition: "bottom"
        });
      }
    }
  }

  uploadImage(file) {
    if (file) {
      const data = new FormData();
      data.append(`file`, file);
      return this._uploadImageService.postDocumentUpload(data).then(res => {
        this.userInfoForm.get('profileUrl').setValue(res.data.fileName);
        this.url = res.data.url;

      });
    }
  }


  submit() {
    if (this.userInfoForm.valid) {
      this.selectedTrades = this.selectedTrades.map((trade: TradeList) => {
        if (trade.tradeId === this.OthersId) {
          trade.tradeDescription = this.customTrade.value.trade;
        }
        return trade;
      })

      let data: UserDetails = this.userInfoForm.getRawValue();
      data.myAccountUpdate = false;
      data.trade = [...this.userInfoForm.get('trade').value, ...this.selectedTrades];
      data.countryCode = this.userInfoForm.getRawValue().countryCode.callingCode
      data.countryId = this.userInfoForm.getRawValue().countryCode.countryId
      data.orgPincode = String(this.userInfoForm.getRawValue().orgPincode)
      this._userService.submitUserDetails(data).then(res => {
        if (this.url) {
          this._userService.UpdateProfileImage.next(this.url);
          localStorage.setItem('profileUrl', this.url);
        }
        this._router.navigate(['dashboard']);
      });

    }
  }
  redirectToDashboard() {
    this._router.navigate(['/dashboard']);
  }
}