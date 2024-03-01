import { Injectable } from '@angular/core';
import { Storage, getBlob, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  private readonly storageUrl = 'CV/CV.pdf';

  constructor(
    private storage: Storage,
  ) { }

  public async downloadCVPdf(): Promise<void> {
    let blob = await getBlob(ref(this.storage, this.storageUrl));
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.download = 'Marco Carfizzi - CV.pdf';
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  } 
}
