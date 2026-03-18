import {
  AfterViewInit,
  Component, computed, effect,
  ElementRef,
  input,
  InputSignal, OnDestroy,
  ViewChild
} from '@angular/core';
import {MetricField, MetricGroupByAddress, NodeMetricType} from '../../models/node-info.model';
import {Chart} from 'chart.js/auto';
import 'chartjs-adapter-date-fns';


interface ChartPoint { x: number; y: number; }
interface Series { label: string; data: ChartPoint[]; }

@Component({
  selector: 'app-type-graph-component',
  imports: [],
  templateUrl: './type-graph-component.html',
  styleUrl: './type-graph-component.scss',
})
export class TypeGraphComponent implements AfterViewInit, OnDestroy {
  type: InputSignal<NodeMetricType> = input<NodeMetricType>(NodeMetricType.GENERATE);
  values: InputSignal<MetricGroupByAddress[]> = input<MetricGroupByAddress[]>([]);
  field: InputSignal<MetricField> = input<MetricField>('avg_bandwidth');

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart<'line', ChartPoint[]>;


  private datasets = computed(() => {
    const currentField = this.field();

    return this.values().map(addrObj => ({
      label: addrObj.address,
      data: addrObj.value.map(m => ({
        x: new Date(m.timestamp).getTime(),
        y: (m as any)[currentField] as number
      })),
      borderWidth: 2,
      pointRadius: 2,
      tension: 0.1
    }));
  });


  constructor() {
    effect(() => {
      const data = this.datasets();
      const newTitle = this.type();

      if (this.chart) {
        this.chart.data.datasets = data as any;
        if (this.chart.options.plugins?.title) {
          this.chart.options.plugins.title.text = newTitle;
        }
        this.chart.update('none');
      }
    });
  }

  ngAfterViewInit() {
    const ctx = this.canvasRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: this.datasets() as any
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // Wichtig: CSS .graph-card braucht eine feste Höhe!
        animation: false,
        scales: {
          x: {
            type: 'time', // Dank date-fns Adapter jetzt möglich
            time: {
              unit: 'second',
              displayFormats: {
                second: 'HH:mm:ss'
              }
            },
            title: { display: true, text: 'Zeit' }
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: this.field() }
          }
        },
        plugins: {
          title: { display: true, text: String(this.type()) }
        }
      }
    });
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }


}
