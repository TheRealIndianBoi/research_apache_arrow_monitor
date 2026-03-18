import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeGraphComponent } from './type-graph-component';

describe('TypeGraphComponent', () => {
  let component: TypeGraphComponent;
  let fixture: ComponentFixture<TypeGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TypeGraphComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
