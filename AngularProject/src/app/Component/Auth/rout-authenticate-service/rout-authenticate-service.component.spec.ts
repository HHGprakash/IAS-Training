import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutAuthenticateServiceComponent } from './rout-authenticate-service.component';

describe('RoutAuthenticateServiceComponent', () => {
  let component: RoutAuthenticateServiceComponent;
  let fixture: ComponentFixture<RoutAuthenticateServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutAuthenticateServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutAuthenticateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
