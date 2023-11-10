import { TestBed } from '@angular/core/testing';

import { DoctorSignUpService } from './doctor-sign-up.service';

describe('DoctorSignUpService', () => {
  let service: DoctorSignUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorSignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
