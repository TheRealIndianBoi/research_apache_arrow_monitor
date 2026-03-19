import {Component, input, InputSignal} from '@angular/core';
import {NodeMetric} from '../../models/node-info.model';

@Component({
  selector: 'app-logs-area-component',
  imports: [],
  templateUrl: './logs-area-component.html',
  styleUrl: './logs-area-component.scss',
})
export class LogsAreaComponent {
  logs: InputSignal<string[]> = input<string[]>([]);
}
