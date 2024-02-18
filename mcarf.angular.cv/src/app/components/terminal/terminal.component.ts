import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';

interface Command {
  input: string;
  output: string;
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TerminalComponent implements OnInit {
  public commands: Command[] = [];
  public currentInput: string = '';
  public isCursorVisible: boolean = true;

  private cursorInterval$ = interval(1000);

  constructor() {}

  ngOnInit(): void {
    this.cursorInterval$.subscribe(() => {
      this.isCursorVisible = !this.isCursorVisible;
    });
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      this.currentInput = '';
      this.commands = [];
      return;
    }
    if (event.key === 'Enter') {
      this.executeCommand();
      return;
    }
    if (event.key === 'Backspace') {
      if (this.currentInput.length > 0)
        this.currentInput = this.currentInput.substring(
          0,
          this.currentInput.length - 1
        );
      else this.currentInput = '';
      return;
    }
    if (event.key.length > 1)
      return;
    else 
      this.currentInput += event.key[0];
  }

  private executeCommand(): void {
    if (this.currentInput.trim() === '') return;

    // Simulated command execution
    const output = this.simulateCommandExecution(this.currentInput);

    this.commands.push({ input: this.currentInput, output: output });

    this.currentInput = '';
  }

  private simulateCommandExecution(input: string): string {
    switch (input.trim().toLowerCase()) {
      case 'help':
        return 'Elenco dei comandi disponibili: help, about, contact';
      case 'about':
        return 'Questo è un terminale simulato creato con Angular.';
      case 'contact':
        return "Puoi contattarci all'indirizzo email: marco.carfizzi@gmail.com";
      default:
        return `Comando non riconosciuto: ${input}`;
    }
  }
}
