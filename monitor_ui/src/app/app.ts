import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './shared/header-component/header-component';
import {AlertComponent} from './shared/alert-component/alert-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('woolmilk-ui');
}
