import { Component, AfterViewInit, signal, model } from "@angular/core";
import { ClientModel } from "../../../models/client.model";
import { ClientsService } from "../../services/clients.service"
import { MatDialog } from "@angular/material/dialog";
import { DialogModule } from "@angular/cdk/dialog";
import { PdfService } from "../../services/pdf.service";
import { PdfModel } from "../../../models/pdf.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-documents",
  templateUrl: "./documents.component.html",
  styleUrl: "./documents.component.scss"
})
export class DocumentsComponent implements AfterViewInit {
  readonly panelOpenState = signal(false);
  clientsList: ClientModel[] = []
  pdfList: PdfModel[] = []
  id = ""
  selectedFile: File | undefined

  constructor(
    private clientsService: ClientsService,
    private pdfService: PdfService,
    private snackBar: MatSnackBar,
  ) {}
  ngAfterViewInit(): void {
    this.clientsService.read()
      .then((clients) => {
        this.clientsList = clients
      }).catch(e => console.log(e))
    this.getPdfs()
  }

  getPdfs() {
    this.pdfService.read()
    .then((pdfs) => {
      this.pdfList = pdfs
    }).catch(e => console.log(e))
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null
  }

  send(clientId: string): void {
    if (!this.selectedFile) return
    this.pdfService.encodePDFToBase64(this.selectedFile).then((v) => {
      const model: PdfModel = {
        clientId: clientId,
        pdfFile: v,
        pdfName: this.selectedFile?.name || "",
      }
      this.pdfService
        .create(model)
        .then((pdfModel) => {
          this.snackBar.open("Documento enviado com sucesso", "Close", {
            horizontalPosition: "right",
            verticalPosition: "top",
            duration: 2000,
            panelClass: [ "snackbar-success" ]
          });
        })
        this.getPdfs()
    })
  }

  downloadFile(dataStr: string, filename: string) {
    this.pdfService.decodeBase64ToPDF(dataStr, filename)
      .then((data) => {
        const blob = new Blob([data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob)
        window.open(url);
      })
  }
}
