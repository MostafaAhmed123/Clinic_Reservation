// doctor-home-page.component.ts
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorHomePageService } from '../doctor-home-page.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-doctor-home-page',
  templateUrl: './doctor-home-page.component.html',
  styleUrls: ['./doctor-home-page.component.scss']
})
export class DoctorHomePageComponent implements OnInit {
  Date: string = '';
  StartTime: string = '';
  EndTime: string = '';
  Is_available: boolean = true;
  slots: any[] = [];
  show = false;
  slotId: number = 0;
  id:any;
  constructor(
    private router: Router,
    private doctorHomePageService: DoctorHomePageService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params=>
      {this.id= params['id'];}
      );
      this.loadDoctorSlots();
      
  }
  
  

  openPop() {
    this.show = true;
  }

  closePop() {
    this.show = false;
  }

  addSlot(date: string, startTime: string, endTime: string, isAvailable: boolean) {
    if (this.isPastDateTime(date, startTime)) {
      this.toastr.error('Cannot add a slot with a past date and time.', 'Error');
      return;
    }

    if (this.isPastDateTime(date, endTime)) {
      this.toastr.error('Cannot add a slot with a past date and time.', 'Error');
      return;
    }

    const doctorId = this.id;
    const newSlot = {
      Date: date,
      StartTime: startTime,
      EndTime: endTime,
      Is_available: true,
      doctorSlotFK: doctorId,
    };

    this.doctorHomePageService.createSlot(newSlot).subscribe(
      (response) => {
        console.log('Slot created successfully!', response);
        this.toastr.success('Slot created successfully!', 'Success');
        this.loadDoctorSlots();
        // this.slots.push(newSlot);
        this.closePop();
      },
      (error) => {
        console.error('Error creating slot:', error);
        this.toastr.error('Failed to create slot. Please try again later.', 'Error');
      }
    );
  }

  editSlot(slot:any) {
    if (this.isPastDateTime(slot.date, slot.startTime)) {
      this.toastr.error('Cannot edit a slot with a past date and time.', 'Error');
      return;
    }

    if (this.isPastDateTime(slot.date, slot.endTime)) {
      this.toastr.error('Cannot edit a slot with a past date and time.', 'Error');
      return;
    }

    const updatedSlot = {
      slotId: slot.slot_id,
      Date: this.Date,
      StartTime: this.StartTime ,
      EndTime: this.EndTime,
    };
    console.log(slot)
    this.doctorHomePageService.editSlot(updatedSlot).subscribe(
      (response) => {
        console.log('Slot edited successfully!', response);
        this.toastr.success('Slot edited successfully!', 'Success');
        this.loadDoctorSlots();
        this.closePop();
      },
      (error) => {
        console.error('Error editing slot:', error);
        this.toastr.error('Failed to edit slot. Please try again later.', 'Error');
      }
    );
  }

  loadDoctorSlots() {
    const doctorId = this.id;
    console.log(doctorId);
    this.doctorHomePageService.getAllSlots(this.id).subscribe(
      (response) => {
        console.log('Slots successfully retrieved:', response);
        this.slots = response;
      },
      (error) => {
        console.error('Error fetching doctor slots:', error);
        this.toastr.error('Failed to fetch doctor slots. Please try again later.', 'Error');
      }
    );
  }
  
  

  isSlotAvailable(date: string, startTime: string, endTime: string): boolean {
    // Loop through existing slots to check availability
    for (const slot of this.slots) {
      if (
        slot.date === date &&
        this.isTimeRangeOverlap(startTime, endTime, slot.startTime, slot.endTime)
      ) {
        // Slot is not available if there is an overlap in time range
        return false;
      }
    }

    // Slot is available if no overlapping time range is found
    return true;
  }

  isTimeRangeOverlap(start1: string, end1: string, start2: string, end2: string): boolean {
    // Check if two time ranges overlap
    const startTime1 = new Date(`2000-01-01T${start1}`);
    const endTime1 = new Date(`2000-01-01T${end1}`);
    const startTime2 = new Date(`2000-01-01T${start2}`);
    const endTime2 = new Date(`2000-01-01T${end2}`);

    return startTime1 < endTime2 && endTime1 > startTime2;
  }

  isPastDateTime(date: string, time: string): boolean {
    const currentDateTime = new Date();
    const inputDateTime = new Date(`${date}T${time}`);

    return currentDateTime > inputDateTime;
  }

  navigateToLogin() {
    this.router.navigate(['']);
  }



  deleteSlot(slot: any) {
    const confirmation = confirm('Are you sure you want to delete this slot?');
    if (confirmation) {
      const slotId = slot.SlotId; // Assuming SlotId is the correct property name
      console.log(slotId);

      this.doctorHomePageService.deleteSlot(slotId).subscribe(
        () => {
          this.toastr.success('Slot deleted successfully!', 'Success');
          const index = this.slots.indexOf(slot);
          if (index !== -1) {
            this.slots.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error deleting slot:', error);
          this.toastr.error('Failed to delete slot. Please try again later.', 'Error');
        }
      );

    }
  }
}