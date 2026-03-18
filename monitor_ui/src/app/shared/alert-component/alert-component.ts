import {Component, computed, OnDestroy} from '@angular/core';
import {AlertService} from '../../services/alert-service';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-alert-component',
  imports: [
    NgClass
  ],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.scss',
})
export class AlertComponent implements OnDestroy {
  alerts = computed(() => this.alertService.alerts());

  constructor(private alertService: AlertService) {
  }

  close(alert: any) {
    this.alertService.remove(alert);
  }

  ngOnDestroy() {
    this.alertService.clear();
  }
}
