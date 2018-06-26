import {Component, OnInit, NgZone, DoCheck, AfterViewInit} from '@angular/core';
import {CommsService} from '../../services/comms.service';
// import { } from 'googlemaps';
import {MapsAPILoader} from '@agm/core';
import {Geolocation} from '../../components/search/geolocation';
import {Place} from '../places/place';
import {PlaceService} from '../../services/place.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
// import { CompileNgModuleMetadata } from '@angular/compiler';
declare let google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, DoCheck, AfterViewInit {
  searchFilter = '';
  searchLocation: Geolocation;
  loc: object;

  // Map
  lat = 43.6532;
  lng = -79.3832;
  zoom = 13;
  maxMarkers = 10;
  mapResults: object;

  newSearch: boolean;

  places: Place[] = [];

  selectedPlace = -1;

  favs: Place[];
  showFav: boolean = false;

  constructor(private commsService: CommsService,
              private mapsAPILoader: MapsAPILoader,
              private placeService: PlaceService,
              private flashMessages: FlashMessagesService,
              private router : Router
  ) {
  }

  ngOnInit() {
    this.commsService.searchFilter.subscribe(data => this.searchFilter = data);
    this.commsService.searchLocation.subscribe(data => this.searchLocation = data);
    this.commsService.newSearch.subscribe(data => this.newSearch = data);
    this.commsService.selectedPlace.subscribe(data => this.selectedPlace = data);
    this.commsService.showFavs.subscribe(data => this.showFav = data);
  }


  ngAfterViewInit() {

    if (!this.searchLocation.lat) {
      this.router.navigate(['/']);
    }
  }

  ngDoCheck() {

    if (this.newSearch) {

      this.loc = new google.maps.LatLng(this.searchLocation.lat, this.searchLocation.lng);
      this.setPlaces();
      this.commsService.toggleSearch(false);
    }
    if (!this.favs) {
      this.placeService.favs.subscribe(data => this.favs = data);
    }

  }

  getPlaces() {
    return new Promise(resolve => {
      this.mapsAPILoader.load().then(() => {
        // let search = new google.maps.places.PlacesService(document.createElement('div'));
        const search = new google.maps.places.PlacesService(document.createElement('div'));
        // const toronto = new google.maps.LatLng(43.6532, -79.3832);
        const request: object = {
          location: this.loc,
          radius: 1500,
          type: ['point_of_interest'],
          keyword: this.searchFilter
        };
        search.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // console.log(results);
            resolve(results);
          } else {
            // console.log(status);
            // console.log('inside else of search');
            this.flashMessages.show('Your search returned no results, try again', {cssClass: 'flashValidate-err', timeout: 5000});
          }
        });
      }, reject => {
        // console.log('rejected')
        reject();
      });
    });
  }

  async setPlaces() {
    const response = <object>await this.getPlaces();
    // console.log(response);
    this.placeService.setGooglePlaces(response);
    this.mapResults = response;
    this.lat = this.searchLocation.lat;
    this.lng = this.searchLocation.lng;
  }

  onMarkerClick(lat: number, lng: number, index: number) {
    // this.lat = lat;
    // this.lng = lng;
    this.selectedPlace = index;
  }

}
