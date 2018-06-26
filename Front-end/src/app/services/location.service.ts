import { Injectable } from '@angular/core';
import { Geolocation } from '../components/search/geolocation';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MapsAPILoader } from '@agm/core';
import { CommsService } from './comms.service';
import { Router } from '@angular/router';

declare let google: any;

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private geoLoc : Promise<Geolocation>;
  // private geoLoc = new BehaviorSubject<Geolocation>(new Geolocation);
  userGeoLoc = this.geoLoc;

  private geocoder: any = null;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private commsService : CommsService,
    private router: Router
  ) {
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
          this.commsService.changeNow(location).then(
            ()=>{
              console.log('change now promise')
              setTimeout(() => {
                this.commsService.toggleSearch(true);
                }, 100);
                
                this.router.navigate(['/dashboard']);
            },
            ()=>{
              console.log('rejected')
            }
          );
          // this.commsService.changeLocation(location);
        },
        (error) => {
          console.log(error.code);// CODE IS 1 WHEN USER DENIES PERMISSION
          console.log(error.message);
          console.log(error.PERMISSION_DENIED);
        });
    } else {
      alert('geolocation unavailable');
    }
    // this.geoLoc.next(location);
    return location;
  }

  geocoding(current_location: string): Promise<any> {
    const latlng: Geolocation = new Geolocation();

    return this.mapsAPILoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();

      return new Promise((resolve, reject) => {
        this.geocoder.geocode({ 'address': current_location }, (result: any, status: any) => {
          if (status === google.maps.GeocoderStatus.OK) {
            // resolve(result);
            console.log(result[0]);
            latlng.lat = result[0].geometry.location.lat();
            latlng.lng = result[0].geometry.location.lng();
            resolve(latlng);
          } else {
            reject(status);
          }
          // this.geoLoc.next(latlng);
          this.commsService.changeLocation(latlng)
          // .then(
          //   () => {
          //     console.log('change now promise')
          //     setTimeout(() => {
          //       console.log('inside timeout');
          //       this.commsService.toggleSearch(true);
          //     }, 100);

          //     this.router.navigate(['/dashboard'])
          //   },
          //   () => {
          //     console.log('rejected')
          //   }
          // )
          // this.commsService.changeLocation(latlng);
        });
      });
    }).then(
      () => {
              console.log('change now promise')
              setTimeout(() => {
                console.log('inside timeout');
                this.commsService.toggleSearch(true);
              }, 100);

              this.router.navigate(['/dashboard'])
            }
    );
  } // end of geocoding function
}
