import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSignUpComponent } from './doctor-sign-up.component';

describe('DoctorSignUpComponent', () => {
  let component: DoctorSignUpComponent;
  let fixture: ComponentFixture<DoctorSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorSignUpComponent]
    });
    fixture = TestBed.createComponent(DoctorSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
