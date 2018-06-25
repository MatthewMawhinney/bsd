import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { CommsService } from '../../services/comms.service';
import { LocationService } from '../../services/location.service';
import { Geolocation } from '../search/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userLoc: string;
  newSearch: boolean;
  gpsLocation: Geolocation;
  searchFilter: string;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private comms: CommsService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    this.comms.newSearch.subscribe(data => this.newSearch = data);
  }

  onSearch() {
    //if (this.searchFilter == undefined) {
    //  this.flashMessage.show('Please enter a search', { cssClass: 'flashValidate-err', timeout: 5000 });
    //  return false;
    //}

    //if (this.userLoc == undefined && this.gpsLocation == undefined) {
    //  this.flashMessage.show('Please enter a location', { cssClass: 'flashValidate-err', timeout: 5000 });
    //  return false;
    //}

    if(document.getElementById("searchField").hasAttribute("disabled")) {
      this.gpsLocation = this.locationService.requestGeoLoc();
      this.comms.changeLocation(this.gpsLocation);
    } else {
      this.geocoding(this.userLoc);
    }

    this.updateSearch(this.searchFilter);

    // this.comms.toggleSearch(true);
    setTimeout(() => {
      this.comms.toggleSearch(true);
    }, 100);

    this.router.navigate(['/dashboard']);
  }

  // Clear search filter
  clearSearch() {
    this.updateSearch('');
  }

  // Function to update 'search' in CommsService
  updateSearch(search: string) {
    this.comms.changeSearch(search);
  }

  public geocoding(userLoc: string) {
    // pass the current location to MapService.geocoding()
    this.locationService.geocoding(userLoc).then(
      rtn => {
        const location = rtn[0].geometry.location;
        // get lat and long and then assign to the props
        const latlng: Geolocation = new Geolocation();
        latlng.lat = location.lat();
        latlng.lng = location.lng();
        this.comms.changeLocation(latlng);
      }
    );
  }

  useGps() {
    let locationText: any = document.querySelector('#searchField');
    if (locationText.hasAttribute('disabled')) {
      locationText.removeAttribute('disabled');
      locationText.setAttribute('placeholder', "Search by address or city...");
      locationText.focus();
    } else {
      locationText.setAttribute('disabled', true);
      locationText.setAttribute('placeholder', "Using GPS");
      locationText.value = 'Using GPS';
    }
  }
  
  onLogoutClick() {
    this.registerService.logout();
    this.flashMessage.show('You are now logged out.', {cssClass: 'flashValidate-suc', timeout: 5000});
    this.router.navigate(['/']);
    return false;
  }

}
