import threading
from collections import deque
from typing import Deque

from schema.logs import LogObject, LogType

class Colors:
    BLUE = '\033[34m'
    RED = '\033[31m'
    YELLOW = '\033[33m'
    RESET = '\033[0m'


def print_log(log_object: LogObject) -> None:
    log_type: str = "DEBUG"

    if log_object.type == LogType.INFO:
        log_type = f"{Colors.BLUE}INFO{Colors.RESET}"
    elif log_object.type == LogType.WARN:
        log_type = f"{Colors.YELLOW}WARN{Colors.RESET}"
    elif log_object.type == LogType.ERROR:
        log_type = f"{Colors.RED}ERROR{Colors.RESET}"

    print(f"[{log_object.timestamp}][{log_type}] {log_object.message}")


class Logger:
    def __init__(self, log_save_level: LogType = LogType.WARN, log_print_level: LogType = LogType.INFO, log_max: int = 1000):
        self.log_save_level = log_save_level
        self.log_print_level = log_print_level
        self.logs: Deque[LogObject] = deque(maxlen=log_max)
        self._lock = threading.Lock()

    def log(self, message: str, level: LogType = LogType.DEBUG):
        log_object: LogObject = LogObject(message, level)

        if level >= self.log_save_level:
            with self._lock:
                self.logs.append(log_object)

        if level >= self.log_print_level:
            print_log(log_object)

    def get_logs(self):
        with self._lock:
            logs = list(self.logs)
            self.logs.clear()
            return logs

