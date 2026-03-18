from dataclasses import dataclass
from enum import Enum

import pyarrow as pa


class HealthStatus(str, Enum):
    OK = "OK"
    WARN = "WARN"
    CRITICAL = "CRITICAL"
    ERROR = "ERROR"
    UNKNOWN = "UNKNOWN"


@dataclass
class HealthResult:
    status: HealthStatus
    cpu: float
    memory: float
    def to_dict(self):
        return {
            "STATUS": self.status.value,
            "CPU": self.cpu,
            "MEM": self.memory
        }


HEALTH_SCHEMA = pa.schema([
    ("status", pa.string()),
    ("cpu", pa.float64()),
    ("memory", pa.float64()),
])