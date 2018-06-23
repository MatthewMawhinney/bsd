import { Injectable } from '@angular/core';
import { Place } from "../components/places/place";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
 providedIn: 'root'
})
export class PlaceService {
  private placesBehavior = new BehaviorSubject<Place[]>([]);
  places = this.placesBehavior.asObservable();

  setGooglePlaces(response: object) {
    const placesHold: Place[] = [];
  // response.forEach((element) => {
  //   const place = new Place();
  //   place.id = element.id;
  //   place.place_id = element.place_id;
  //   place.name = element.name;
  //   place.rating = element.rating;
  //   place.vicinity = element.vicinity;
  //   place.types = element.types;
  //   placesHold.push(place);
  // });

  for (let i in response) {
      const place = new Place();
      place.id = response[i].id;
      place.place_id = response[i].place_id;
      place.name = response[i].name;
      place.rating = response[i].rating;
      place.vicinity = response[i].vicinity;
      place.types = response[i].types;
      place.opening_hours = response[i].opening_hours;
      place.icon = response[i].icon;
      placesHold.push(place);
  }
  
  this.placesBehavior.next(placesHold);
  }

  getGooglePlaces(): Observable < Place[] > {
    return this.places;
  }

  constructor() {
  }
}