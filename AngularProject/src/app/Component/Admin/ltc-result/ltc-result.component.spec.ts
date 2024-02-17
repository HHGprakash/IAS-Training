import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtcResultComponent } from './ltc-result.component';

describe('LtcResultComponent', () => {
  let component: LtcResultComponent;
  let fixture: ComponentFixture<LtcResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtcResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtcResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
