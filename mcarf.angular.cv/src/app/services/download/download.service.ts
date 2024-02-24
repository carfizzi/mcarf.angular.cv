import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor() { }

  public downloadCVPdf(): void {
    let link = document.createElement('a');
    link.download = 'Marco Carfizzi - CV.pdf';
    link.href = "./assets/CV/CV.pdf";
    link.click();
  } 
}
