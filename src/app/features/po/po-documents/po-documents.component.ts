import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  SimpleChanges
} from "@angular/core";
import { DocumentUploadService } from "src/app/shared/services/document-download/document-download.service";
import { DocumentList } from "src/app/shared/models/PO/po-data";
import { first } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: "app-po-documents",
  templateUrl: "./po-documents.component.html"
})
export class PoDocumentsComponent implements OnInit {
  @Input("documentListLength") public documentListLength: number;
  @Input("documentData") documentData: DocumentList[];
  documentList: DocumentList[] = [];
  docs: FileList;
  urlReceived = false;
  documentsName: string[] = [];
  mode: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private documentUploadService: DocumentUploadService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.mode = params.mode;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  fileUpdate(files: FileList) {
    // this.urlReceived = false;
    this.docs = files;
    this.uploadDocs();
  }

  uploadDocs() {
    if (this.docs && this.docs.length) {
      const data = new FormData();
      const fileArr: File[] = [];
      data.append(`file`, this.docs[0]);
      return this.documentUploadService.postDocumentUpload(data).then(res => {
        let name: string = res.data;
        let firstName: number = res.data.fileName.indexOf("_");
        let subFileName = res.data.fileName.substring(firstName + 1, res.data.fileName.length);
        this.documentsName.push(subFileName);
        this.documentList.push({
          documentType: "PO",
          DocumentDesc: subFileName,
          DocumentUrl: res.data.url,
          documentName: subFileName
        });
        this.documentListLength = this.documentList.length;
        subFileName = "";
      }).catch(err => {
        this._snackBar.open(
          err.error.message,
          "",
          {
            duration: 4000,
            panelClass: ["warning-snackbar"],
            verticalPosition: "top"
          }
        );

      });
    }
  }

  getData() {
    if (this.documentList) {
      return this.documentList;
    }
  }

  removeFile(i) {
    this.documentList.splice(i, 1);
    this.documentsName.splice(i, 1);
    this.documentListLength = this.documentList.length;
  }

  openFileUrl(url: string) {
    this.router.navigate([url]);
  }
}
