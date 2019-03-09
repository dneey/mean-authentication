import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  username: string;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  authenticateUser() {
    const user = {
      username: this.username,
      password: this.password
    };


  this.authService.authenticateUser(user).subscribe(data => {
    if (data.success) {
      console.log(data);
      this.authService.storeUserData(data.token, data.user);
      this.flashMessage.show('You are now logged in.', {cssClass : 'alert-success', timeout: 5000});
      this.router.navigate(['dashboard']);
    } else {
      this.flashMessage.show(data.message, {cssClass : 'alert-danger', timeout: 5000});
      this.router.navigate(['login']);

    }
  });

  }

}
