import { Component } from '@angular/core';
import { Router } from '@angular/router';
import  {UserLoginService} from '../user-login.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environment/environment';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  loginForm: any;

  constructor(private router: Router, private userLoginService: UserLoginService,  private toastr: ToastrService,
    ) {}
    login(event: Event) {
      event.preventDefault(); // Prevent the default form submission behavior
      this.userLoginService.login(this.username, this.password).subscribe(
        (response) => {
          const id= response.ID;
          const username = response.Username;
          console.log(response);

          // Handle the response here, e.g., set user login status or show a message.
          if (response.Type == "Doctor") {
            this.toastr.success('Login successful!', 'Success');
            this.router.navigate(['/doctorHomePage',id]);
          } else if (response.Type == "Patient") {
            this.toastr.success('Login successful!', 'Success');
            this.router.navigate(['/patientHomePage', username]);
          } else {
            this.toastr.error('Login failed. Please check your credentials!', 'Error');
          }
          console.log(environment.BACKEND_URL);
        },
        (error) => {
          console.log("An error occurred");
          // Handle any error that occurred during the HTTP request.
          this.toastr.error('An error occurred during login. Please try again later.', 'Error');
        }
      );
      }

  navigateToPatientSignUp() {
    this.router.navigate(['/patientSignUp']);
  }
  navigateToDoctorSignUp(){
    this.router.navigate(['/doctorSignUp'])
  }
}
