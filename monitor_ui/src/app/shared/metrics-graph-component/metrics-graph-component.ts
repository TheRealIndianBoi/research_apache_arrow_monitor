import {Component, computed, input, InputSignal, signal, Signal} from '@angular/core';
import {
  MetricField,
  MetricGroup, MetricGroupByAddress,
  MetricGroupByType,
  NodeMetric,
  NodeMetricType
} from '../../models/node-info.model';
import {TypeGraphComponent} from '../type-graph-component/type-graph-component';


@Component({
  selector: 'app-metrics-graph-component',
  imports: [
    TypeGraphComponent
  ],
  templateUrl: './metrics-graph-component.html',
  styleUrl: './metrics-graph-component.scss',
})
export class MetricsGraphComponent {
  metrics: InputSignal<NodeMetric[]> = input<NodeMetric[]>([]);
  pollIntervalSeconds = input<number>(5);
  windowPolls = input<number>(10);

  groupedByType: Signal<MetricGroupByType[]> = computed(() => this.groupAfterType(this.metrics()));



  selectedField = signal<MetricField>('avg_bandwidth');

  setField(f: MetricField) {
    this.selectedField.set(f);
  }

  groupAfterType(values: NodeMetric[]): MetricGroupByType[] {
    let metrics: Map<NodeMetricType, Map<string, MetricGroup[]>> = new Map();
    values.map(value => {
      let type_list: Map<string, MetricGroup[]> = metrics.get(value.type) ?? new Map();
      let address_list: MetricGroup[] = type_list.get(value.address) ?? [];

      address_list.push({
        timestamp: value.timestamp,
        total_duration_ns: value.total_duration_ns,
        avg_duration_ns: value.avg_duration_ns,
        total_bytes: value.total_bytes,
        avg_bytes: value.avg_bytes,
        count: value.count,
        avg_bandwidth: value.avg_bandwidth,
      } as MetricGroup);


      address_list.sort((a, b) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });

      type_list.set(value.address, address_list);
      metrics.set(value.type, type_list);
    });

    const result: MetricGroupByType[] = [];
    for (const [type, type_map] of metrics) {
      const list_values: MetricGroupByAddress[] = [];
      for (const [address, value] of type_map) {
        list_values.push({address, value});
      }
      result.push({type, value: list_values});
    }

    return result;
  }
}
