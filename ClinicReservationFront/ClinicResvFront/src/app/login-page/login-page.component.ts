import { Component } from '@angular/core';
import { Router } from '@angular/router';
import  {UserLoginService} from '../user-login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private userLoginService: UserLoginService,  private toastr: ToastrService
    ) {}
  login() {
    this.userLoginService.login(this.username, this.password).subscribe(
      (response) => {
        // Handle the response here, e.g., set user login status or show a message.
        if (response.success) {
          this.toastr.success('Login successful!', 'Success');
          // You can also navigate the user to another page here if needed
        } else {
          this.toastr.error('Login failed. Please check your credentials!', 'Error');
        }
      },
      (error) => {
        // Handle any error that occurred during the HTTP request.
        this.toastr.error('An error occurred during login. Please try again later.', 'Error');

      }

    )};
  navigateToPatientSignUp() {
    this.router.navigate(['/patientSignUp']);
  }
  navigateToDoctorSignUp(){
    this.router.navigate(['/doctorSignUp'])
  }
}
