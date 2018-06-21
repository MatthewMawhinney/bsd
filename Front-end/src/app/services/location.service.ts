import { Injectable } from '@angular/core';
import { Geolocation } from '../components/search/geolocation';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { CommsService } from './comms.service';

declare let google: any;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  userGeoLoc: Observable<Geolocation>;
  private geocoder: any = null;

  constructor(private comms: CommsService, private mapsAPILoader: MapsAPILoader) {
  }

  /**
   * REQUEST GEOLOCATION POSITION FROM USER (ASYNCHRONOUS)
   * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
   */
  requestGeoLoc(): Geolocation {
    let location: Geolocation = new Geolocation();
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // this.userGeoLoc = new Geolocation();
          location.lat = position.coords.latitude;
          location.lng = position.coords.longitude;
          location.accuracy = position.coords.accuracy.valueOf();
          console.log(position);
        },
        (error) => {
          console.log(error.code);// CODE IS 1 WHEN USER DENIES PERMISSION
          console.log(error.message);
          console.log(error.PERMISSION_DENIED);
        });
    } else {
      alert('geolocation unavailable');
    }
    return location;
  }

  geocoding(current_location: string): Promise<any> {
    return this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        this.geocoder.geocode({ 'address': current_location }, (result: any, status: any) => {
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(result);
            console.log(result);
          } else {
            reject(status);
          }
        });
      });
    });
  } // end of geocoding function
}
