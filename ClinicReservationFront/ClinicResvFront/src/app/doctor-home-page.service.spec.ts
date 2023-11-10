import { TestBed } from '@angular/core/testing';

import { DoctorHomePageService } from './doctor-home-page.service';

describe('DoctorHomePageService', () => {
  let service: DoctorHomePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorHomePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
