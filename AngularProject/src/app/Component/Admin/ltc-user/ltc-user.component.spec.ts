import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LtcUserComponent } from './ltc-user.component';

describe('LtcUserComponent', () => {
  let component: LtcUserComponent;
  let fixture: ComponentFixture<LtcUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LtcUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LtcUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
