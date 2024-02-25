import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { ReCaptchaV3Provider, initializeAppCheck, provideAppCheck } from '@angular/fire/app-check';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideFunctions(() => getFunctions()),
      provideAppCheck(() => initializeAppCheck(getApp(), {
        provider: new ReCaptchaV3Provider('6LcTTH4pAAAAADSEPowmz5xwy7IRwhwb10mfqViG')
      })),
      provideStorage(() => getStorage()),
    ]),
    provideRouter(routes)
  ]
};
