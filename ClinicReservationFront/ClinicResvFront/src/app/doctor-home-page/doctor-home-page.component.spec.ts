import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorHomePageComponent } from './doctor-home-page.component';

describe('DoctorHomePageComponent', () => {
  let component: DoctorHomePageComponent;
  let fixture: ComponentFixture<DoctorHomePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorHomePageComponent]
    });
    fixture = TestBed.createComponent(DoctorHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
