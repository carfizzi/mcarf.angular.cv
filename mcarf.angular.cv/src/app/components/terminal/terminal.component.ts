import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Command {
  input: string;
  output: string;
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class TerminalComponent {
  public commands: Command[] = [];
  public currentInput: string = '';

  constructor() { }

  @HostListener('document:keypress', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent) { 
    console.log(event.key)
    if (event.key === "Enter") {
      this.executeCommand();
    }
    else {
      this.currentInput += event.key;
    }
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
        return "Elenco dei comandi disponibili: help, about, contact";
      case 'about':
        return "Questo è un terminale simulato creato con Angular.";
      case 'contact':
        return "Puoi contattarci all'indirizzo email: marco.carfizzi@gmail.com";
      default:
        return `Comando non riconosciuto: ${input}`;
    }
  }
}
