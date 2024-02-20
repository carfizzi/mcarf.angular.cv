import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TerminalComponent } from "./components/terminal/terminal.component";
import { CookieStorageService } from './services/cookies/cookies.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, TerminalComponent]
})
export class AppComponent implements OnInit{
  title = 'mcarf.angular.cv';

  public lastLoginDate: Date | undefined;

  constructor(
    private cookiesService: CookieStorageService,
  ) {}

    ngOnInit(): void {
      const lastLogin = this.cookiesService.getCookie('last-login');
      this.lastLoginDate = new Date(lastLogin ?? '');

      const now = new Date();
      this.cookiesService.setCookie('last-login', now.toString(), 7);
    }
}
