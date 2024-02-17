import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyLayoutComponent } from './safety-layout.component';

describe('SafetyLayoutComponent', () => {
  let component: SafetyLayoutComponent;
  let fixture: ComponentFixture<SafetyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
