import {Component, OnInit} from '@angular/core';
import {Place} from "../places/place";
import {PlaceService} from "../../services/place.service";
import {CommsService} from "../../services/comms.service";

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  searchFilter: string;
  maxPlaces = 10;
  places: Place[] = [];

  constructor(private placeService: PlaceService, private comms: CommsService) {
  }

  ngOnInit() {
    this.placeService.getGooglePlaces().subscribe(data => this.places = data);
    this.comms.searchFilter.subscribe(data => this.searchFilter = data);
  }

  onPlace(index: number) {
    this.comms.changeSelectedPlace(index);
  }

}
