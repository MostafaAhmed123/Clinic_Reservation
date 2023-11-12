import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSignUpComponent } from './patient-sign-up.component';

describe('PatientSignUpComponent', () => {
  let component: PatientSignUpComponent;
  let fixture: ComponentFixture<PatientSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientSignUpComponent]
    });
    fixture = TestBed.createComponent(PatientSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
