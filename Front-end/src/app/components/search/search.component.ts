import {Component, OnInit} from '@angular/core';
import {CommsService} from '../../services/comms.service';
// import { MapService } from './user-location/map.service';
import {LocationService} from '../../services/location.service';
import {Geolocation} from './geolocation';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFilter: string;
  userLoc: string;
  gpsLocation: Geolocation;
  newSearch: boolean;

  constructor(private comms: CommsService, private locationService: LocationService) {
  }

  ngOnInit() {
    this.comms.newSearch.subscribe(data => this.newSearch = data);
  }
  
  onSearch() {
    if (document.getElementById('gps').classList.contains('btn-success')) {
      this.gpsLocation = this.locationService.requestGeoLoc();
      this.comms.changeLocation(this.gpsLocation);
    } else {
      this.geocoding(this.userLoc);
    }

    this.updateSearch(this.searchFilter);

 
    setTimeout(() => {
      this.comms.toggleSearch(true);
    }, 100);
  }

  // Function to update 'search' in CommsService
  updateSearch(search: string) {
    this.comms.changeSearch(search);
  }

  // Take user input value (address, city, postal code... and turn to lat&long)
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
    let gpsBtn: any = document.querySelector('#gps');
    let locationText: any = gpsBtn.previousSibling;
    if (gpsBtn.classList.contains('btn-secondary')) {
      gpsBtn.classList.replace('btn-secondary', 'btn-success');
      locationText.setAttribute('disabled', true);
      locationText.setAttribute('placeholder', "Using GPS");
    } else if (gpsBtn.classList.contains('btn-success')) {
      gpsBtn.classList.replace('btn-success', 'btn-secondary');
      locationText.removeAttribute('disabled');
      locationText.setAttribute('placeholder', "Search by address or city...");
      locationText.focus();
    }
  }

  toggleOptions() {
    let list: any = document.querySelector('.dropdown-list');
    if (list.style.left == '0px') {
      list.style.left = "-10000px";
      list.style.position = "absolute";
    } else {
      list.style.left = "0px";
      list.style.position = "unset";
    }
  }

  updateButton() {
    let dropdownBtn: any = document.querySelector('#listBtn');
    let selected: any = document.querySelectorAll('input:checked');
    if (selected.length == 0) {
      dropdownBtn.innerHTML = "Search Filters";
      return;
    } else if (selected.length >= 3) {
      dropdownBtn.innerHTML = selected.length + " filters";
      return;
    }
    let text = [];
    selected.forEach((item) => {
      text.push(item.nextElementSibling.textContent) + ", ";
    })
    dropdownBtn.innerHTML = text.toString();
  }
}
