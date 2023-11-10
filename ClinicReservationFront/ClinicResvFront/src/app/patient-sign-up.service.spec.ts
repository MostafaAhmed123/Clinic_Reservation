import { TestBed } from '@angular/core/testing';

import { PatientSignUpService } from './patient-sign-up.service';

describe('PatientSignUpService', () => {
  let service: PatientSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
