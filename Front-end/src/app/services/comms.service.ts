import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Geolocation} from '../components/search/geolocation';


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

  constructor(  ) {
  }

  changeSearch(selection: string) {
    this.search.next(selection);
  }

  // Get latitude and longitude from typed value
  changeLocation(location: Geolocation) {
this.location.next(location);//Pass Object with lat and lng
  }

  changeNow(location: Geolocation){
    // console.log("inside change Now")
    return new Promise ((success, fail) =>{
        this.location.next(location);//Pass Object with lat and lng
        success();
        fail();
    })
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
