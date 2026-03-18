import {Component, input, InputSignal} from '@angular/core';
import {NodeMetric} from '../../models/node-info.model';

@Component({
  selector: 'app-metrics-table-component',
  imports: [],
  templateUrl: './metrics-table-component.html',
  styleUrl: './metrics-table-component.scss',
})
export class MetricsTableComponent {
  metrics: InputSignal<NodeMetric[]> = input<NodeMetric[]>([]);
}
