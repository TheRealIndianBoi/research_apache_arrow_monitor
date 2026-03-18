from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum

import pyarrow as pa


class MetricType(str, Enum):
    RECEIVE = "RECEIVE"
    SEND = "SEND"
    PROCESS = "PROCESS"
    WRITE = "WRITE"


@dataclass
class RawMetric:
    client_url: str
    metric_type: MetricType
    duration_ns: int
    bytes: int

RAW_METRIC_SCHEMA = pa.schema([
    ("client_url", pa.string()),
    ("metric_type", pa.string()),
    ("duration_ns", pa.int64()),
    ("bytes", pa.int64()),
])

@dataclass
class AggregatedMetric:
    timestamp: datetime
    client_url: str
    metric_type: MetricType
    total_duration_ns: int
    avg_duration_ns: float
    total_bytes: int
    avg_bytes: float
    count: int
    avg_bandwidth_mps: float


AGGREGATED_METRIC_SCHEMA = pa.schema([
    ("timestamp", pa.timestamp("ns")),
    ("client_url", pa.string()),
    ("metric_type", pa.string()),
    ("total_duration_ns", pa.int64()),
    ("avg_duration_ns", pa.float64()),
    ("total_bytes", pa.int64()),
    ("avg_bytes", pa.float64()),
    ("count", pa.int64()),
    ("avg_bandwidth_mbps", pa.float64()),
])
