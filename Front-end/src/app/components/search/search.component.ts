import { Component, OnInit } from '@angular/core';
import { CommsService } from '../../services/comms.service';
// import { MapService } from './user-location/map.service';
import { LocationService } from '../../services/location.service';
import { Geolocation } from './geolocation';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFilter: string;

  userLoc: string;

  newSearch: boolean;

  constructor(private comms: CommsService, private locationService: LocationService) {
  }

  ngOnInit() {
    this.comms.newSearch.subscribe(data => this.newSearch = data);
  }

  // Accepts new search on button click
  onSearch() {
    // GET THE RADIO BUTTON ELEMENT THAT IS CHECKED FOR THE LOCATION
    const searchBy = document.querySelector('input[name="location"]:checked');
    switch (searchBy.id) {
      case 'gps':
        const gpsLocation = this.locationService.requestGeoLoc();
        // get lat and long and then assign to the props
        this.comms.changeLocation(gpsLocation);
        break;
      case 'userDefined':
        this.geocoding(this.userLoc);
        break;
    }

    this.updateSearch(this.searchFilter);

    // this.comms.toggleSearch(true);
    setTimeout(() => {
      this.comms.toggleSearch(true);
    }, 100);
  }

  // Clear search filter
  clearSearch() {
    this.updateSearch('');
  }

  // Function to update 'search' in CommsService
  updateSearch(search: string) {
    this.comms.changeSearch(search);
  }

  // Accepts new search though Enter key press
  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.updateSearch(this.searchFilter);
    }
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
}
