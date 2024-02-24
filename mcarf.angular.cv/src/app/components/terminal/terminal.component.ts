import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, interval, mergeMap, of } from 'rxjs';
import { ChatService } from '../../services/chat/chat.service';
import { Command } from '../../models/command';
import { CommandType } from '../../enums/command-type';
import { AsciiSpinnerComponent } from "../ascii-spinner/ascii-spinner.component";

@Component({
    selector: 'app-terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, AsciiSpinnerComponent]
})
export class TerminalComponent implements OnInit {
  public commands: Command[] = [];
  public CommandType = CommandType;
  public currentInput: string = '';
  public isComputingCommand: boolean = false;

  private command$: Subject<string> = new Subject<string>();

  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.command$
      .pipe(
        mergeMap(observable => of(observable), 1)
      )
      .subscribe((command: string) => {
        const output = this.executeInputCommand(command);
        if (output === '') {
          this.handlePrompt();
        } else {
          this.updateCommands(command, output);
          this.currentInput = '';
        }
      });
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isComputingCommand)
      return;
    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      this.handleCtrlL();
    } else if (event.key === 'Enter') {
      this.handleEnter();
    } else if (event.key === 'Backspace') {
      this.handleBackspace();
    } else if (event.key.length === 1) {
      this.handleCharacterKey(event.key[0]);
    }
  }

  private handleCtrlL(): void {
    this.currentInput = '';
    this.commands = [];
  }

  private handleEnter(): void {
    this.executeAICommand();
  }

  private handleBackspace(): void {
    if (this.currentInput.length > 0)
      this.currentInput = this.currentInput.substring(0, this.currentInput.length - 1);
    else
      this.currentInput = '';
  }

  private handleCharacterKey(key: string): void {
    this.currentInput += key;
  }

  // Handles the execution of an AI command
  private executeAICommand(): void {
    if (this.currentInput.trim() === '')
      return;
    this.isComputingCommand = true;
    this.command$.next(this.currentInput);
  }

  // Update command history after being done with its execution
  private updateCommands(input: string, output: string, type: CommandType = CommandType.SECONDARY) {
    let command = new Command(input, output, type);
    this.commands.push(command);
    this.isComputingCommand = false;
  }

  // Handles the given command by returning the proper answer.
  // Default case is empty string and will be handled as an OpenAI request
  private executeInputCommand(input: string): string {
    switch (input.trim().toLowerCase()) {
      case 'help':
        return 'Elenco dei comandi disponibili: help, about, contact';
      case 'about':
        return 'Questo è un terminale simulato creato con Angular.';
      case 'contact':
        return "Puoi contattarci all'indirizzo email: marco.carfizzi@gmail.com";
      default:
        return '';
    }

  }

  private handlePrompt(): void {
    this.chatService.chat(this.currentInput)
      .subscribe({
        next: (res) => {
          this.updateCommands(this.currentInput, res);
          this.currentInput = '';
        },
        error: (err: any) => {
          console.error(err);
          this.updateCommands(this.currentInput, `ERROR: ${JSON.stringify(err.error?.error?.message ?? "Something went bad with the prompt request! Code: " + err.customData.httpStatus).replaceAll('"', '')}`, CommandType.ERROR);
          this.currentInput = '';
        }
      });
  }
}
