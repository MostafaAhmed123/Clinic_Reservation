import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSlotComponent } from './edit-slot.component';

describe('EditSlotComponent', () => {
  let component: EditSlotComponent;
  let fixture: ComponentFixture<EditSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSlotComponent]
    });
    fixture = TestBed.createComponent(EditSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
