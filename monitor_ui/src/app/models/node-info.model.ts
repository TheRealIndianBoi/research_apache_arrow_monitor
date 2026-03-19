export type NodeType = 'Source' | 'Sink' | 'Processing';

export interface NodeInfo {
  url: string;
  type: NodeType;
  query: string;
  forward_urls: string[];
}

export interface NodeHealthStatus {
  STATUS: "OK" | "WARNING" | "ERROR" | "UNKNOWN";
  CPU: number;
  MEM: number;
}

export enum NodeMetricType {
  GENERATE = "GENERATE",
  RECEIVE = "RECEIVE",
  SEND = "SEND",
  PROCESS = "PROCESS",
  WRITE = "WRITE",
}

export interface NodeMetric {
  timestamp: string;
  total_duration_ns: number;
  avg_duration_ns: number;
  total_bytes: number;
  avg_bytes: number;
  count: number;
  avg_bandwidth: number;
  client_url: string;
  metric_type: NodeMetricType;
}

export interface ChartPoint {
  x: number;
  y: number | null;
}


export interface MetricGroup {
  timestamp: string;
  total_duration_ns: number;
  avg_duration_ns: number;
  total_bytes: number;
  avg_bytes: number;
  count: number;
  avg_bandwidth: number;
}
export interface MetricGroupByAddress {
  client_url: string;
  value: MetricGroup[];
}

export interface MetricGroupByType {
  metric_type: NodeMetricType;
  value: MetricGroupByAddress[];
}

export type MetricField =
  | 'avg_bandwidth'
  | 'total_duration_ns'
  | 'avg_duration_ns'
  | 'total_bytes'
  | 'avg_bytes'
  | 'count';

