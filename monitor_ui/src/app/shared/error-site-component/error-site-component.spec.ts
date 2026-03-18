import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSiteComponent } from './error-site-component';

describe('ErrorSiteComponent', () => {
  let component: ErrorSiteComponent;
  let fixture: ComponentFixture<ErrorSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorSiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorSiteComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
