import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TerminalComponent } from "./components/terminal/terminal.component";
import { CookieStorageService } from './services/cookies/cookies.service';
import { HeaderComponent } from './components/header/header.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TerminalComponent, HeaderComponent]
})
export class AppComponent implements OnInit {
  title = 'Marco Carfizzi';

  public lastLoginDate: Date | undefined;
  private isTouchKeyboardOpened: boolean = false;

  @ViewChild('touchCatcher') hiddenInput: ElementRef | undefined;

  constructor(
    private cookiesService: CookieStorageService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Marco Carfizzi - Home')
    this.updateLastLoginDate();
  }

  private updateLastLoginDate(): void {
    const lastLogin = this.cookiesService.getCookie('last-login');
    const now = new Date();

    this.lastLoginDate = (lastLogin && lastLogin.length > 0) ? new Date(lastLogin) : now;

    this.cookiesService.setCookie('last-login', now.toString(), 7);
  }

  public toggleKeyboard(): void {
    if (!this.hiddenInput)
      return;
    this.isTouchKeyboardOpened = !this.isTouchKeyboardOpened;
    if (this.isTouchKeyboardOpened)
      this.hiddenInput.nativeElement.focus();
    else
      this.hiddenInput.nativeElement.blur();
  }
}
