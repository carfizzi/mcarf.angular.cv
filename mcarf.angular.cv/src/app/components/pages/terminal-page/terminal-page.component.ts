import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CookieStorageService } from '../../../services/cookies/cookies.service';
import { Title } from '@angular/platform-browser';
import { TerminalComponent } from "../../terminal/terminal.component";
import { HeaderComponent } from "../../header/header.component";

@Component({
    selector: 'app-terminal-page',
    standalone: true,
    templateUrl: './terminal-page.component.html',
    styleUrl: './terminal-page.component.css',
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [
        CommonModule,
        TerminalComponent,
        HeaderComponent
    ]
})
export class TerminalPageComponent implements OnInit { 
    public lastLoginDate: Date | undefined;
    private isTouchKeyboardOpened: boolean = false;
    @ViewChild('touchCatcher') hiddenInput: ElementRef | undefined;


    constructor(
        private cookiesService: CookieStorageService,
        private titleService: Title,
      ) { }

    ngOnInit(): void {
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
