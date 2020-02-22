import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { Suppliers } from "src/app/shared/models/RFQ/suppliers";
import {
  RfqMaterialResponse,
  AddRFQ
} from "src/app/shared/models/RFQ/rfq-details";
import { MatDialog, MatCheckbox, MatSnackBar } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { RFQService } from "src/app/shared/services/rfq/rfq.service";
import { SuppliersDialogComponent } from "src/app/shared/dialogs/add-supplier/suppliers-dialog.component";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";

@Component({
  selector: "app-rfq-supplier",
  templateUrl: "./rfq-supplier.component.html"
})
export class RfqSupplierComponent implements OnInit {
  @Input() finalRfq: AddRFQ;
  searchText: string = null;
  buttonName: string = "selectSupplier";
  displayedColumns: string[] = [
    "Supplier Name",
    "Email",
    "Phone No.",
    "PAN No."
  ];
  allSuppliers: Suppliers[] = [];
  selectedSuppliersList: Suppliers[] = [];
  selectedSupplierFlag: boolean = false;
  checkedMaterialsList: AddRFQ;
  orgId: number;
  rfqData: AddRFQ;
  supplierForm: FormGroup;
  supplierCounter: number = 0;
  newAddedId: number;
  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private rfqService: RFQService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.orgId = Number(localStorage.getItem("orgId"));
    this.allSuppliers = this.activatedRoute.snapshot.data.createRfq[0].data;
    this.formInit();
  }
  formInit() {
    const frmArr: FormGroup[] = this.allSuppliers.map(supplier => {
      return this.formBuilder.group({
        supplier: []
      });
    });
    this.supplierForm = this.formBuilder.group({
      forms: new FormArray(frmArr)
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    this.rfqData = this.finalRfq;
  }
  valueChange(supplier: Suppliers, ch: MatCheckbox, i: number) {
    const sArr = this.supplierForm.controls["forms"] as FormArray;
    const sGrp = sArr.at(i) as FormGroup;
    if (ch.checked) {
      if (this.supplierCounter < 3) {
        this.supplierCounter++;
        sGrp.get("supplier").setValue(supplier);
      } else {
        this.supplierAlert();
        ch.checked = false;
      }
    } else {
      this.supplierCounter--;
      sGrp.get("material").reset();
    }
  }

  supplierAlert() {
    this._snackBar.open("Cannot add more than 3 supplier", "", {
      duration: 2000,
      verticalPosition: "top"
    });
  }

  navigateToUploadPage() {
    this.rfqData.supplierId = this.supplierForm.value.forms.map(supplier => {
      if (supplier.supplier) {
        return supplier.supplier.supplierId;
      }
    });
    this.rfqData.supplierId = this.rfqData.supplierId.filter(supplierId => {
      if (supplierId) {
        return supplierId;
      }
    });
    this.finalRfq = this.rfqData;
    this.rfqService.addRFQ(this.finalRfq).then(res => {
      let finalRfq = res.data;
      this.router.navigate(["/rfq/review/"], {
        state: { finalRfq }
      });
    });
  }
  openDialog(projectId) {
    const dialogRef = this.dialog.open(SuppliersDialogComponent, {
      width: "1200px",
      data: projectId
    });
    dialogRef
      .afterClosed()
      .toPromise()
      .then(result => {
        result;
        this.rfqService.getSuppliers(this.orgId).then(data => {
          let allSuppliersId = this.allSuppliers.map(supp => supp.supplierId);
          let tempId = data.data.map(supp => supp.supplierId);
          allSuppliersId.forEach(id => {
            if (!tempId.includes(id)) {
              this.newAddedId = id;
            }
          });
          this.allSuppliers = data.data;
          this.formInit();
        });
      });
  }
}
