import { Routes } from '@angular/router';
import { TerminalPageComponent } from './components/pages/terminal-page/terminal-page.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'terminal', component: TerminalPageComponent, pathMatch: 'full' },
    { path: '**', redirectTo: ''}
];
