import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { RfqMaterialResponse, Address } from "../../models/RFQ/rfq-details";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddAddressService } from "../../services/add-address/add-address.service";

export interface City {
  value: string;
  viewValue: string;
}
// Component for dialog box
@Component({
  selector: "address-dialog",
  templateUrl: "./add-addressPo.html"
})

// Component class
export class AddAddressPoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddAddressPoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private addAddressService: AddAddressService
  ) {}
  selectAddressFrm: FormGroup;
  newAddressForm: FormGroup;
  address: Address;
  ngOnInit() {
    console.log("data", this.data);
    if (this.data.roleType === "projectBillingAddressId") {
      this.addAddressService
        .getPoAddAddress("Project", this.data.id)
        .then(res => {
          this.address = res.data;
          console.log("addressProject", this.address);
        });
    } else {
      this.addAddressService
        .getPoAddAddress("Supplier", this.data.id)
        .then(res => {
          this.address = res.data;
          console.log("addressSupplier", this.address);
        });
    }
    this.formInit();
  }
  cities: City[] = [
    { value: "Gurgaon", viewValue: "Gurgaon" },
    { value: "Delhi-1", viewValue: "Delhi" },
    { value: "Karnal", viewValue: "Karnal" }
  ];

  formInit() {
    this.selectAddressFrm = this.formBuilder.group({
      address: []
    });
    console.log("form data", this.selectAddressFrm);

    // new address form
    this.newAddressForm = this.formBuilder.group({
      addressLine1: ["", Validators.required],
      addressLine2: ["", Validators.required],
      pinCode: ["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      gstNo: ["", Validators.required]
    });
    console.log("addresss", this.newAddressForm.value);
  }

  onselectAddress(): void {
    this.dialogRef.close([this.data.roleType, this.selectAddressFrm.value]);
  }

  onAddAddress(): void {
    this.postAddAddress(
      this.data.roleType === "projectBillingAddressId" ? "project" : "supplier",
      this.newAddressForm.value
    );
  }

  //   onNoClick1(): void {
  //     this.address = this.newAddressForm.value;
  //     console.log("addresss", this.newAddressForm.value);
  //     console.log("new object", this.address);
  //     this.postAddAddress(this.address);
  //   }

  postAddAddress(role, address) {
    this.addAddressService
      .postAddAddress(role, this.data.id, address)
      .then(res => {
        this.dialogRef.close([this.data.roleType, { address: res.data }]);
        console.log("res.data", res.data);
      });
  }
}
