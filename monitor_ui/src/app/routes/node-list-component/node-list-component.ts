import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {NodeHealthStatus, NodeInfo} from '../../models/node-info.model';
import {NodeService} from '../../services/node-service';
import {ErrorSiteComponent} from '../../shared/error-site-component/error-site-component';
import {RouterLink} from '@angular/router';
import {AlertService} from '../../services/alert-service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-node-list-component',
  imports: [
    ErrorSiteComponent,
    RouterLink,
    NgClass
  ],
  templateUrl: './node-list-component.html',
  styleUrl: './node-list-component.scss',
})
export class NodeListComponent implements OnInit, OnDestroy {

  nodes: NodeInfo[] = [];
  nodesStatus = signal<Record<string, NodeHealthStatus>>({})


  private healthSub?: { unsubscribe: () => void };
  private loadSub?: { unsubscribe: () => void };

  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  constructor(private readonly nodeService: NodeService, private readonly alertService: AlertService) {}

  ngOnInit(): void {
    this.loadNodes();
    this.startHealthPolling();
  }

  loadNodes(): void {
    this.loading.set(true);
    this.error.set(false);

    this.loadSub = this.nodeService.getNodes().subscribe({
      next: (data) => {
        this.nodes = data;
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(true);
        this.loading.set(false);
        this.alertService.show("error", ("STATUS: "+ err.status+ "\n Problem: "+ err.message))
      }
    });
  }

  startHealthPolling(): void {
    if (this.healthSub) return;

    this.healthSub = this.nodeService.getAllNodeHealth()
      .subscribe({
        next: (status) => (this.nodesStatus.set(status)),
        error: (err) => {
          this.error.set(true);
          this.alertService.show("error", ("STATUS: "+ err.status+ "\n Problem: "+ err.message));
        }
      });
  }

  stopHealthPolling(): void {
    this.healthSub?.unsubscribe();
    this.healthSub = undefined;
  }

  stopNodePolling(): void {
    this.loadSub?.unsubscribe();
    this.loadSub = undefined;
  }

  ngOnDestroy() {
    this.stopHealthPolling();
    this.stopNodePolling();
  }
}
