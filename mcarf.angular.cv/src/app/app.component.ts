import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {

  @ViewChild('touchCatcher') hiddenInput: ElementRef | undefined;

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Marco Carfizzi - Home');
  }
}
