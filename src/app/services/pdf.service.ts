import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { PdfModel } from '../../models/pdf.model';
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private BASE_URL = "http://localhost:3100";
  constructor(private http: HttpClient) {}

  public async read(): Promise<PdfModel[]> {
    return await firstValueFrom(
      this.http.get<PdfModel[]>(`${this.BASE_URL}/pdf`)
    );
  }

  public async create(pdf: PdfModel): Promise<PdfModel> {
    return await firstValueFrom(
      this.http.post<PdfModel>(`${this.BASE_URL}/pdf`, {
        clientId: pdf.clientId,
        pdfFile: pdf.pdfFile,
        pdfName: pdf.pdfName
      })
    );
  }

  public encodePDFToBase64(pdfFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(",")[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(pdfFile);
    });
  }

  public decodeBase64ToPDF(base64String: string, filename: string): Promise<File> {
    return new Promise((resolve, reject) => {
      const byteCharacters = atob(base64String);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const pdfFile = new File([blob], filename, { type: 'application/pdf' });
      resolve(pdfFile);
    });
  }  
}
