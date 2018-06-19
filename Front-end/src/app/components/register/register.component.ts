import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RegisterService } from '../../services/register.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
//import { User } from './User.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;

  //form__registration: FormGroup;

  constructor(
    private registerService: RegisterService, 
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    //this.form__registration = new FormGroup({
    //  userName: new FormControl(),
    //  email: new FormControl(null, [
    //    Validators.required,
    //    Validators.email
    //  ]),
    //  password: new FormControl(null, Validators.required),
    //});
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Error: All fields are required!', {cssClass: 'flashValidate-err', timeout: 5000});
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email!', { cssClass: 'flashValidate-err', timeout: 5000 });
      return false;
    }

    //Register User
    this.registerService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Welcome to Backseat Driver!', { cssClass: 'flashValidate-suc', timeout: 5000 });
        //this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong...', { cssClass: 'flashValidate-err', timeout: 5000 });
      }
    });

    //console.log(this.form__registration); // value contains the user inputs formatted in {}
    //const user = new User(
    //  this.form__registration.value.email,
    //  this.form__registration.value.password,
    //  this.form__registration.value.userName
    //);
    //this.registerService
      //.register(user).subscribe(data => console.log(data), error => console.log(error));
    // above passes an user object like below to authService  
    // User {userName: "terumikusaka", email: "t.kusaka3@gmail.com", password: "123456"}
    //this.form__registration.reset();
  }
}