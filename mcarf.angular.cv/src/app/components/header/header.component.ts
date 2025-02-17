import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DownloadService } from '../../services/download/download.service';

@Component({
    selector: 'app-header',
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() lastLoginDate: Date | undefined = new Date();
  public notifications: number = 1;

  constructor(
    private downloadService: DownloadService,
  ) { }
  public onNotificationNumberClick(): void {
    this.downloadService.downloadCVPdf();
    this.notifications = 0;
  }
}
