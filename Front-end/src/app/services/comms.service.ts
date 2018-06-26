import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Geolocation} from '../components/search/geolocation';
import { LocationService } from '../services/location.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommsService {

  private search = new BehaviorSubject<string>('');
  searchFilter = this.search.asObservable();

  private location = new BehaviorSubject<Geolocation>(new Geolocation);
  searchLocation = this.location.asObservable();

  private newSearchBehaviour = new BehaviorSubject<boolean>(false);
  newSearch = this.newSearchBehaviour.asObservable();

  private selectedPlaceBehavior = new BehaviorSubject<number>(-1);
  selectedPlace = this.selectedPlaceBehavior.asObservable();

  private showFavsBehavior = new BehaviorSubject<boolean>(false);
  showFavs = this.showFavsBehavior.asObservable();

  constructor(
    // private locationService : LocationService,
    private router : Router,
  ) {

  }

  changeSearch(selection: string) {
    this.search.next(selection);
  }

  // Get latitude and longitude from typed value
  changeLocation(location: Geolocation) {
    console.log('change location');
    
    this.location.next(location);//Pass Object with lat and lng
                // this.toggleSearch(true);
    // this.router.navigate(['/dashboard']);

    console.log(this.location);
  }

  changeNow(location: Geolocation){
    console.log("inside change Now")
    return new Promise ((success, fail) =>{
        this.location.next(location);//Pass Object with lat and lng
        success();
        fail();
    })
    // this.toggleSearch(true);
    // console.log('fired inside change Location');
    // this.router.navigate(['/dashboard']);
  }

  toggleSearch(state: boolean) {
    if (state) {
      this.newSearchBehaviour.next(true);
    } else {
      this.newSearchBehaviour.next(false);
    }
  }

  changeSelectedPlace(selection: number) {
    this.selectedPlaceBehavior.next(selection);
  }

  toggleFavs(state: boolean) {
    if (state) {
      this.showFavsBehavior.next(true);
    } else {
      this.showFavsBehavior.next(false);
    }
  }
}
