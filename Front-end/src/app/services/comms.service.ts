import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Geolocation } from '../components/search/geolocation';

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

  constructor() {
  }

  changeSearch(selection: string) {
    this.search.next(selection);
  }

  // Get latitude and longitude from typed value
  changeLocation(location: Geolocation) {
    this.location.next(location);//Pass Object with lat and lng
  }

  toggleSearch(state: boolean) {
    if (state) {
      this.newSearchBehaviour.next(true);
    } else {
      this.newSearchBehaviour.next(false);
    }
  }
}
