import {Injectable, signal} from '@angular/core';

export interface AlertMessage {
  type: 'success' | 'error' | 'info' | 'warning';
  text: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alerts = signal<AlertMessage[]>([]);

  show(type: AlertMessage['type'], text: string) {
    const newAlert = { type, text };
    this.alerts.update(a => [...a, newAlert]);
    setTimeout(() => this.remove(newAlert), 5000);
  }

  remove(alert: AlertMessage) {
    this.alerts.update(a => a.filter(x => x !== alert));
  }

  clear() {
    this.alerts.set([]);
  }

}

