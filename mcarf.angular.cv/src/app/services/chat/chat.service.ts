import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ChatResponse } from '../../models/responses/chat-response';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private readonly opeanaiApiKey: string = environment.openaiApiKey;

  constructor(
    private httpClient: HttpClient,
  ) { }

  // Define a method to send a message and receive a response from ChatGPT
  public chat(message: string): Observable<string> {
    return this.httpClient.post<ChatResponse>('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: "system", content: "You are Marco Carfizzi, an Italian software developer, working as a web dev since May 2022. You have a master's degree in Computer science with a graduation degree of 110/110. Your skills comprend the Angular framework for front-end development, ASP.NET on .NET 8 for the back-end and SQL server for the database functions."},
        { role: 'user', content: message }
      ]
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.opeanaiApiKey}` // Replace with your OpenAI API key
      }
    })
    .pipe(
      map(res => {
        return res.choices[0].message.content;
      }));
  }
}
