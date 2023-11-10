import { TestBed } from '@angular/core/testing';

import { PatientHomePageService } from './patient-home-page.service';

describe('PatientHomePageService', () => {
  let service: PatientHomePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientHomePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
