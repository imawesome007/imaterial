import { Component, OnInit } from "@angular/core";
import {
  RfqMaterialResponse,
  AddRFQ
} from "src/app/shared/models/RFQ/rfq-details";
import { Router } from "@angular/router";
import { Suppliers } from "src/app/shared/models/RFQ/suppliers";
import { DocumentUploadService } from "src/app/shared/services/document-download/document-download.service";

@Component({
  selector: "documents",
  templateUrl: "./documents.component.html",
  styleUrls: [
    "../../../../assets/scss/main.scss"
    // "../../../../../node_modules/froala-editor/css/froala_editor.pkgd.min.css",
    // "../../../../../node_modules/froala-editor/css/froala_style.min.css"
  ]
})
export class DocumentsComponent implements OnInit {
  searchText: string = null;
  buttonName: string = "uploadDocuments";
  checkedMaterialsList: RfqMaterialResponse[];
  selectedSuppliersList: Suppliers[];
  docs: FileList;
  rfqDetails: AddRFQ;

  constructor(
    private router: Router,
    private documentUploadService: DocumentUploadService
  ) {}

  ngOnInit() {
    this.checkedMaterialsList = history.state.checkedMaterialsList;
    this.selectedSuppliersList = history.state.selectedSuppliersList;
    console.log("checkedMaterialsList", this.checkedMaterialsList);
    console.log("selectedSuppliersList", this.selectedSuppliersList);
  }

  setButtonName(name: string) {
    this.buttonName = name;
  }

  fileUpdate(files: FileList) {
    this.docs = files;
    console.log("docs", this.docs);
    this.uploadDocs();
  }

  uploadDocs() {
    if (this.docs && this.docs.length) {
      const data = new FormData();

      const fileArr: File[] = [];

      for (let key in Object.keys(this.docs)) {
        fileArr.push(this.docs[key]);
        data.append(`files[${key}]`, this.docs[key]);
      }
      // data.append(`files`, fileArr);
      data.append("fileUploadType", "RFQ");
      console.log("asdxfcgvhbjnk", data);

      return this.documentUploadService.postDocumentUpload(data).then(res => {
        return res;
      });
      //data.append('parentId', this.item.itemForm.value.locationQtyList[0].attachId);
      // return this.commonService.docUpload(data).then(res => {
      //   return res;
      // });
    }
    // else {
    //   of().toPromise();
    // }
  }
  navigateToReviewRFQ() {
    let checkedMaterialsList = this.checkedMaterialsList;
    let selectedSuppliersList = this.selectedSuppliersList;
    this.router.navigate(["/rfq/review"], {
      state: { checkedMaterialsList, selectedSuppliersList }
    });
  }
}
