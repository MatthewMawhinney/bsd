import { Component, OnInit, Input } from '@angular/core';
import { Place } from "../place";

@Component({
 selector: 'app-place',
    templateUrl: './place.component.html',
    styleUrls: ['./place.component.css']
  })
export class PlaceComponent implements OnInit {
  @Input() place: Place[];

  testRating(rating) {
    if(rating < 2.5){
      return 'low';
    } 
    else if (rating >= 2.5 && rating < 3.5) {
      return 'medium';
    }
    else if (rating >= 3.5 && rating < 4.5) {
      return 'good';
    }
    else {
      return 'high';
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

}