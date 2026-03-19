import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsAreaComponent } from './logs-area-component';

describe('LogsAreaComponent', () => {
  let component: LogsAreaComponent;
  let fixture: ComponentFixture<LogsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogsAreaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogsAreaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
