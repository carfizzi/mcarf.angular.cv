import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TerminalComponent } from "./components/terminal/terminal.component";
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

  @ViewChild('touchCatcher') hiddenInput: ElementRef | undefined;

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Marco Carfizzi - Home')
  }
}
