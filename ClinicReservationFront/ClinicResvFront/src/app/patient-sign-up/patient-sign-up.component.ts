import { Component } from '@angular/core';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { AbstractControl } from '@angular/forms';
import { AuthComponent } from '../service/auth/auth.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-sign-up',
  templateUrl: './patient-sign-up.component.html',
  styleUrls: ['./patient-sign-up.component.scss']
})
export class PatientSignUpComponent {
// constructor(private builder:FormBuilder, private toastr:ToastrService,private service:AuthComponent, private router: Router){
  constructor(private router: Router) {} 
navigateToLogin() {
    // Use the Angular Router to navigate to the "patientSignUp" route
    this.router.navigate(['/login']);
  }
}
// patientSignUpForm = this.builder.group({
//   name:this.builder.control('',Validators.required),
//   userName:this.builder.control('',Validators.required),
//   Password:this.builder.control('',Validators.compose([Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)])),
//   ConfirmPassword:this.builder.control('',[
//     Validators.required,
//     this.passwordMatchValidator
//   ]),
//   MedicalHistory:this.builder.control('')
// });

// passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
//   const password = this.patientSignUpForm.get('Password')?.value;
//   const confirmPassword = control.value;

//   return password === confirmPassword ? null : { mismatch: true };
// }

// proceedPatientSignUp(){
//   if(!this.patientSignUpForm.valid){
//     this.service.ProceedSignUp(this.patientSignUpForm.value).subscribe(res =>{
//       this.toastr.success('Registered Sucessfully');
//       this.router.navigate(['patientHomePage']);
//     });
//   }
//   else{
//     this.toastr.warning('Please Enter Valid Data');
//   }
// }
// }
