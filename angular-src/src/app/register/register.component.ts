import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router

    ) {}

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please Fill all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please Enter A Valid Email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {

      if (data.success) {
          this.flashMessage.show(data.message, {cssClass : 'alert-success', timeout: 5000});
          this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.message, {cssClass : 'alert-danger', timeout: 5000});
          this.router.navigate(['/register']);

      }
    });
  }

}
