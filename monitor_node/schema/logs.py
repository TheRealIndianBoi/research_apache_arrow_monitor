from dataclasses import dataclass, field
from datetime import datetime
from enum import IntEnum

import pyarrow as pa


class LogType(IntEnum):
    DEBUG = 1
    INFO = 2
    WARN = 3
    ERROR = 4

@dataclass
class LogObject:
    message: str
    type: LogType
    timestamp: datetime = field(default_factory=datetime.now)

    def to_dict(self):
        return {
            "message": self.message,
            "type": self.type.name,
            "timestamp": self.timestamp.isoformat()
        }

LOG_SCHEMA = pa.schema([
    ("message", pa.string()),
    ("log_type", pa.string()),
    ("timestamp", pa.timestamp("ns")),
])