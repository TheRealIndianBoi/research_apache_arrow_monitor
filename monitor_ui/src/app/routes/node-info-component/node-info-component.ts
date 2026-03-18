import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {NodeHealthStatus, NodeInfo, NodeMetric} from '../../models/node-info.model';
import {NodeService} from '../../services/node-service';
import {AlertService} from '../../services/alert-service';
import {AsyncPipe, NgClass} from '@angular/common';
import {ErrorSiteComponent} from '../../shared/error-site-component/error-site-component';
import {ActivatedRoute} from '@angular/router';
import {map, Observable} from 'rxjs';
import {MetricsGraphComponent} from '../../shared/metrics-graph-component/metrics-graph-component';
import {MetricsTableComponent} from '../../shared/metrics-table-component/metrics-table-component';

@Component({
  selector: 'app-node-info-component',
  imports: [
    NgClass,
    ErrorSiteComponent,
    MetricsGraphComponent,
    AsyncPipe,
    MetricsTableComponent
  ],
  templateUrl: './node-info-component.html',
  styleUrl: './node-info-component.scss',
})
export class NodeInfoComponent implements OnInit, OnDestroy {
  nodeId: string = '';
  nodeInfo!: NodeInfo;
  nodeStatus: WritableSignal<NodeHealthStatus | null> = signal<NodeHealthStatus | null>(null);

  showTable: WritableSignal<boolean> = signal<boolean>(false);

  loading = signal<boolean>(true);
  error = signal<boolean>(false);


  private healthSub?: { unsubscribe: () => void };
  private infoSub?: { unsubscribe: () => void };

  metricSub$!: Observable<NodeMetric[]>;


  constructor(private readonly nodeService: NodeService,
              private route: ActivatedRoute,
              private readonly alertService: AlertService) {}



  ngOnInit(): void {

    this.nodeId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.nodeId == ""){
      this.error.set(true)
      this.alertService.show("error", "No Node found with given ID!")
      return
    }

    this.loadNodeInfo();
    this.getNodeHealth();


    this.metricSub$ = this.nodeService.getNodeMetric(this.nodeId);

  }



  loadNodeInfo(): void {
    this.loading.set(true);
    this.error.set(false);

    this.infoSub = this.nodeService.getNodeInfo(this.nodeId).subscribe({
      next: (data) => {
        this.nodeInfo = data;
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(true);
        this.loading.set(false);
        this.alertService.show("error", ("STATUS: " + err.status + "\n Problem: " + err.message))
      }
    });
  }


  getNodeHealth(): void {
    if (this.healthSub) return;
    this.healthSub = this.nodeService.getNodeHealth(this.nodeId)
      .subscribe({
        next: (status) => (this.nodeStatus.set(status)),
        error: (err) => {
          this.error.set(true);
          this.alertService.show("error", ("STATUS: "+ err.status+ "\n Problem: "+ err.message));
        }
      });
  }


  stopNodeInfoPolling(): void {
    this.infoSub?.unsubscribe();
    this.infoSub = undefined;
  }

  stopNodeHealthPolling(): void {
    this.healthSub?.unsubscribe();
    this.healthSub = undefined;
  }


  ngOnDestroy(): void {
    this.stopNodeInfoPolling();
    this.stopNodeHealthPolling();
  }

  toggleTable(): void {
    this.showTable.update((value) => !value);
  }


}
