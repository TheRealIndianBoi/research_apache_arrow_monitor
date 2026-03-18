from enum import Enum

import pyarrow.flight as pf

class NodeType(str, Enum):
    SOURCE = "Source"
    SINK = "Sink"
    PROCESS = "Processing"

class NodeInfo:
    def __init__(self, url: str, node_type: NodeType, forward_urls: list[str] | None = None, query: str = ""):
        self.forward_urls = forward_urls or []
        self.query = query
        self.node_type = node_type
        self.client = pf.FlightClient(f"grpc://{url}")


