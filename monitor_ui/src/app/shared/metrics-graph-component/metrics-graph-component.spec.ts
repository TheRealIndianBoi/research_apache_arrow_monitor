import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsGraphComponent } from './metrics-graph-component';

describe('MetricsGraphComponent', () => {
  let component: MetricsGraphComponent;
  let fixture: ComponentFixture<MetricsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricsGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetricsGraphComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
