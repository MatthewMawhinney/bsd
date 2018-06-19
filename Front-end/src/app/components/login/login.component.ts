import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  
  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this.registerService.authenticateUser(user).subscribe(data => {
      if(data.success) {
        this.registerService.storeUserData(data.token, data.user);
        this.router.navigate(['/home']);
      } else {
        this.flashMessage.show(data.msg, {cssClass: 'flashValidate-err', timeout: 5000});
        this.router.navigate(['/login']);
      }
    });
  }

 
}
