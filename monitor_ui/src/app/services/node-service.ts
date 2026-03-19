import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, shareReplay, switchMap, timer} from 'rxjs';
import {NodeHealthStatus, NodeInfo, NodeMetric} from '../models/node-info.model';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  private readonly monitorUrl = 'http://localhost:7998';
  private readonly healthPollTime = 5000;
  private readonly metricPollTime = 5000;
  private readonly logsPollTime = 5000;

  constructor(private readonly http: HttpClient) {}

  getNodes(): Observable<NodeInfo[]> {
    return this.http.get<NodeInfo[]>(`${this.monitorUrl}/nodes`);
  }

  getNodeInfo(url: string): Observable<NodeInfo> {
    return this.http.get<NodeInfo>(`${this.monitorUrl}/nodes/${url}`);
  }

  getAllNodeHealth():
    Observable<Record<string, NodeHealthStatus>> {

    return timer(0, this.healthPollTime).pipe(
      switchMap(() =>
        this.http.get<Record<string, NodeHealthStatus>>(
          `${this.monitorUrl}/nodes/health`
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getNodeHealth(url: string): Observable<NodeHealthStatus> {
    return timer(0, this.healthPollTime).pipe(
      switchMap(() =>
        this.http.get<NodeHealthStatus>(
          `${this.monitorUrl}/nodes/${url}/health`
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }


  getNodeMetric(url: string): Observable<NodeMetric[]> {
    return timer(0, this.metricPollTime).pipe(
      switchMap(() =>
        this.http.get<NodeMetric[]>(
          `${this.monitorUrl}/nodes/${url}/metrics`
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

  getNodeLogs(url: string): Observable<string[]> {
    return timer(0, this.logsPollTime).pipe(
      switchMap(() =>
        this.http.get<string[]>(
          `${this.monitorUrl}/nodes/${url}/logs`
        )
      ),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }

}
