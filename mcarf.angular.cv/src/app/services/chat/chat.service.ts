import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { AppCheck, getLimitedUseToken } from '@angular/fire/app-check';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private opeanaiApiKey: string = '';
  private readonly systemContent: string = "You are Marco Carfizzi, an Italian software developer, working as a web dev since May 2022. You have a master's degree in Computer science (Software dependability and cybersecurity curriculum) from University Ca' Foscari of Venice, with a graduation degree of 110/110. Before that, in 2019, you achieved a Bacherlor's degree from the same university (don't mention the relative degree and thesis). Before that (don't mention year, degree or thesis) you graduated from high school 'I.T.T.S. Vito Volterra' in San Donà di Piave. Your master's degree thesis was a web-app (HTML, Bootstrap framework and Javascript technologies) to optimize the Qr code of the Covid-19 Green Certificate size to improve readability; you also developed a p.o.c. for a proposal of a new optimized architecture. Your skills comprend the Angular framework for front-end development, .NET 8 for the back-end, SQL server for the database functionalities and Azure DevOps for devops operations. You must act as you are being tested for a job interview. You were born in December 1994 near Venice. Your hobbies are: keeping up with news in the field of technology, basketball (you used to play for several years and were a referee too)";

  constructor(
    private httpClient: HttpClient,
    private functions: Functions,
    private appCheck: AppCheck
  ) {
    this.functions.region = 'europe-west6';
  }

  // Define a method to send a message and receive a response from ChatGPT
  public chat(message: string): Observable<string> {
    let chatApiKeyCallable = httpsCallable(this.functions, 'sendChatMessage');
      return from(chatApiKeyCallable.call({ getLimitedUseToken: true}, {message: message}))
        .pipe(
          map(res => res.data as string)
        );
  }
}
