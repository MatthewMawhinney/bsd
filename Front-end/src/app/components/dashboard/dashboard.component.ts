import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {CommsService} from '../../services/comms.service';
import {LocationService} from '../../services/location.service';
import {Geolocation} from '../search/geolocation';
import {Place} from "../places/place";
import {PlaceService} from "../../services/place.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userLoc: Geolocation;
  newSearch: boolean;
  searchFilter: string;
  pinsButton = 'My Pins';
  showFavs = false;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private comms: CommsService,
    private locationService: LocationService,
    private placeService: PlaceService
  ) {
  }

  ngOnInit() {

    this.comms.newSearch.subscribe(data => this.newSearch = data);
    this.comms.showFavs.subscribe(data => this.showFavs = data)
    // this.comms.searchLocation.subscribe(data =>{ this.userLoc = data})
    // console.log('inside init dash, userLoc:');
    // console.log(this.searchFilter);
  }


  swapTags() {
    let tags = document.getElementById("tags");
    if (tags.classList.contains('hide')) {
      tags.classList.remove('hide');
    } else {
      tags.classList.add('hide');
    }
  }

  onSearch() {
    this.comms.changeSearch(this.searchFilter);
    setTimeout(() => {
      this.comms.toggleSearch(true);
    }, 100);
    setTimeout(() => {
      this.comms.toggleFavs(false);
      this.comms.changeSelectedPlace(-1);
    }, 500);
    // console.log('inside onsearch');
    // console.log(this.searchFilter);
  }

  onLogoutClick() {
    this.registerService.logout();
    this.flashMessage.show('You are now logged out.', {cssClass: 'flashValidate-suc', timeout: 5000});
    this.router.navigate(['/']);
    return false;
  }

  onMyPinsClick() {
    if (this.showFavs) {
      this.comms.toggleFavs(false);
      this.pinsButton = 'My Pins';
    } else {
      this.comms.toggleFavs(true);
      this.pinsButton = 'Near Me';
    }
    this.comms.changeSelectedPlace(-1);
    let user = JSON.parse(localStorage.getItem("user"));
    this.placeService.getFavs(user).subscribe();
  }

}
