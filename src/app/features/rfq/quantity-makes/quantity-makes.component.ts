import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialog, MatChipInputEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ProjectDetails,
  ProjectIds
} from "src/app/shared/models/project-details";
import {
  FormBuilder,
  FormArray,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { RFQService } from "src/app/shared/services/rfq/rfq.service";
import { stringify } from "querystring";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  RfqMat,
  RfqMaterialResponse
} from "src/app/shared/models/RFQ/rfq-details";
import { AddAddressDialogComponent } from "src/app/shared/dialogs/add-address/address-dialog.component";

// chip static data
export interface Fruit {
  name: string;
}

@Component({
  selector: "rfq",
  templateUrl: "./quantity-makes.component.html",
  styleUrls: ["../../../../assets/scss/main.scss"]
})
export class RFQQuantityMakesComponent implements OnInit {
  userId: 1;
  searchText: string = null;
  materialCounter = 0;
  buttonName: string = "projectMaterials";
  checkedMaterialsList: RfqMaterialResponse[];
  materialForms: FormGroup;
  rfqMat: RfqMat;

  displayedColumns: string[] = [
    "Material Name",
    "Required Date",
    "Requested Quantity",
    "Estimated Quantity",
    "Estimated Rate",
    "Quantity",
    "Makes"
  ];

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private rfqService: RFQService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    //this.checkedMaterialsList = this.activatedRoute.snapshot.data.quantityMakes;
    this.checkedMaterialsList = history.state.checkedMaterials;
    console.log("projectList", this.checkedMaterialsList);
    if (this.checkedMaterialsList) {
      this.formsInit();
    }
  }
  setButtonName(name: string) {
    this.buttonName = name;
  }
  // chip static code
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: Fruit[] = [{ name: "Lemon" }, { name: "Lime" }, { name: "Apple" }];

  add(event: MatChipInputEvent, index: number): void {
    const input = event.input;
    const value = event.value;
    console.log("value", value);
    this.materialForms.get("forms");
    // if ((value || '').trim() && this.SubjectsArray.length < 5) {
    //   this.SubjectsArray.push({ name: value.trim() })
    // }
    // Add our fruit
    let frmArray = this.materialForms.get("forms") as FormArray;

    frmArray.value[index].makes.push(
      this.formBuilder.group({
        make: value
      })
    );
    console.log(`frmArray`, frmArray);
    if ((value || "").trim()) {
      this.rfqMat.makes.push(value.trim());
    }
    // if ((value || "").trim()) {
    //   this.rfqMat.makes.push(value.trim());
    // }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.rfqMat.makes.splice(index, 1);
    }
  }

  // form functions
  formsInit() {
    console.log("form init", this.checkedMaterialsList);

    const temp = 0;
    const frmArr = this.checkedMaterialsList
      .map((subCat, i) => {
        if (i !== 0) {
          subCat.prevMatListLength = this.checkedMaterialsList[
            i - 1
          ].projectMaterialList.length;
        }

        return subCat.projectMaterialList.map(item => {
          let tempoo = item.projectId + item.materialId;
          return this.formBuilder.group({
            estimatedRate: [item.estimatedRate, Validators.required],
            quantity: [item.quantity, Validators.required],
            makes: [],
            // [item.makes, Validators.required],
            projId: [item.projectId],
            matId: [item.materialId]
          });
        });
      })
      .flat();
    // this.materialForms = this.formBuilder.group({
    //   forms: new FormArray(frmArr)
    // });
    this.materialForms = this.formBuilder.group({});
    this.materialForms.addControl("forms", new FormArray(frmArr));
    console.log("form array", frmArr);

    console.log("material form", this.materialForms);
  }

  showIndent() {
    const formValues = this.materialForms.value.forms;
    console.log("form valueeee", formValues);
    this.checkedMaterialsList.forEach((subCat, i) => {
      subCat.projectMaterialList.forEach((project, j) => {
        formValues.forEach((val, k) => {
          if (
            project.projectId === val.projId &&
            project.materialId === val.matId
          ) {
            this.checkedMaterialsList[i].projectMaterialList[j].estimatedRate =
              val.estimatedRate;
            this.checkedMaterialsList[i].projectMaterialList[j].quantity =
              val.quantity;
            this.checkedMaterialsList[i].projectMaterialList[j].makes =
              val.makes;
          } else {
            return;
          }
        });
      });
    });
    let checkedMaterials = this.checkedMaterialsList;
    if (checkedMaterials) {
      this.router.navigate(["/rfq/suppliers"], {
        state: { checkedMaterials }
      });
    }

    console.log("asdfghjk", this.checkedMaterialsList);
  }

  makesUpdate(data: string[], grpIndex: number) {
    console.log(data, grpIndex);

    const forms = this.materialForms.get("forms") as FormArray;
    forms.controls[grpIndex].get("makes").setValue(data);

    console.log(this.materialForms);
  }

  openDialog(): void {
    if (AddAddressDialogComponent) {
      const dialogRef = this.dialog.open(AddAddressDialogComponent, {
        width: "1200px"
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log("The dialog was closed");
      });
    }
  }
}
