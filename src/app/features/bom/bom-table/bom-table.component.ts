import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { Observable, of } from "rxjs";
import { DataSource } from "@angular/cdk/table";
import { MatTableDataSource } from "@angular/material/table";
import { Data, ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "src/app/shared/services/projectDashboard/project.service";
import {
  ProjectDetails,
  ProjetPopupData
} from "src/app/shared/models/project-details";
import { AddProjectComponent } from "src/app/shared/dialogs/add-project/add-project.component";
import { DoubleConfirmationComponent } from "src/app/shared/dialogs/double-confirmation/double-confirmation.component";
import { MatDialog } from "@angular/material";
import { BomService } from "src/app/shared/services/bom/bom.service";

@Component({
  selector: "app-bom-table",
  templateUrl: "./bom-table.component.html",
  styleUrls: ["./bom-table.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class BomTableComponent implements OnInit {
  projectId: number;
  product: ProjectDetails;
  subcategoryData: Subcategory[] = [];
  columnsToDisplay = [
    "name",
    "estimatedQuantity",
    "requestedMaterial",
    "issuedToProject",
    "availableInStock"
  ];

  innerDisplayedColumns = [
    "name",
    "estimatedQuantity",
    "requestedMaterial",
    "issuedToProject",
    "availableInStock"
  ];
  dataSource: MatTableDataSource<Subcategory>;
  expandedElement: Subcategory | null;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private bomService: BomService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectId = params["id"];
    });
    this.bomService.getMaterialWithQuantity(this.projectId, 51).then(res => {
      console.log(res);
    });

    //this.product = history.state.projectDetails;
    this.getProject(this.projectId);

    SUBCATEGORIES.forEach(subcategory => {
      if (
        subcategory.materials &&
        Array.isArray(subcategory.materials) &&
        subcategory.materials.length
      ) {
        this.subcategoryData = [
          ...this.subcategoryData,
          {
            ...subcategory,
            materials: new MatTableDataSource(subcategory.materials)
          }
        ];
      } else {
        this.subcategoryData = [...this.subcategoryData, subcategory];
      }
    });
    this.dataSource = new MatTableDataSource(this.subcategoryData);
  }
  toggleRow(element: Subcategory) {
    element.materials &&
    (element.materials as MatTableDataSource<Materials>).data.length
      ? (this.expandedElement =
          this.expandedElement === element ? null : element)
      : null;
    this.cd.detectChanges();
  }

  getProject(id: number) {
    this.projectService.getProject(1, id).then(data => {
      this.product = data.message;
    });
  }
  raiseIndent() {
    let projectDetails = this.product;
    this.router.navigate(["/indent/" + this.projectId]);
  }

  // dialog function

  editProject() {
    const data: ProjetPopupData = {
      isEdit: true,
      isDelete: false,
      detail: this.product
    };

    this.openDialog(data);
  }

  deleteProject() {
    const data: ProjetPopupData = {
      isEdit: false,
      isDelete: true,
      detail: this.product
    };

    this.openDialog(data);
  }

  // modal function
  openDialog(data: ProjetPopupData): void {
    if (data.isDelete == false) {
      const dialogRef = this.dialog.open(AddProjectComponent, {
        width: "700px",
        data
      });

      dialogRef
        .afterClosed()
        .toPromise()
        .then(result => {
          //console.log('The dialog was closed');
          //this.animal = result;
        });
    } else if (data.isDelete == true) {
      const dialogRef = this.dialog.open(DoubleConfirmationComponent, {
        width: "500px",
        data
      });

      dialogRef
        .afterClosed()
        .toPromise()
        .then(result => {
          //console.log('The dialog was closed');
          //this.animal = result;
        });
    }
  }
}

export interface Subcategory {
  name: string;
  estimatedQuantity: number;
  requestedMaterial: number;
  issuedToProject: number;
  availableInStock: number;
  materials?: Materials[] | MatTableDataSource<Materials>;
}

export interface Materials {
  name: string;
  estimatedQuantity: number;
  requestedMaterial: number;
  issuedToProject: number;
  availableInStock: number;
}
const SUBCATEGORIES: Subcategory[] = [
  {
    name: "steelbar",
    estimatedQuantity: 1500,
    requestedMaterial: null,
    issuedToProject: null,
    availableInStock: null,
    materials: [
      {
        name: "Steelbar 15mm",
        estimatedQuantity: 1500,
        requestedMaterial: 600,
        issuedToProject: 600,
        availableInStock: 300
      },
      {
        name: "Steelbar 15mm",
        estimatedQuantity: 1500,
        requestedMaterial: 600,
        issuedToProject: 600,
        availableInStock: 300
      }
    ]
  }
];
