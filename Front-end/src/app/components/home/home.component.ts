import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  
  onLogoutClick() {
    this.registerService.logout();
    this.flashMessage.show('You are now logged out.', {cssClass: 'flashValidate-suc', timeout: 5000});
    this.router.navigate(['/home']);
    return false;
  }

}
