import {Component, OnInit} from '@angular/core';
import {Place} from "../places/place";
import {PlaceService} from "../../services/place.service";
import {CommsService} from "../../services/comms.service";
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  searchFilter: string;
  maxPlaces = 10;
  places: Place[] = [];
  favs: Place[] = [];
  showFavs: boolean = false;

  constructor(
    private placeService: PlaceService, 
    private comms: CommsService, 
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.placeService.getGooglePlaces().subscribe(data => this.places = data);
    this.placeService.favs.subscribe(data => this.favs = data);
    this.comms.searchFilter.subscribe(data => this.searchFilter = data);
    this.comms.showFavs.subscribe(data => this.showFavs = data);
  }

  onPlace(index: number) {
    this.comms.changeSelectedPlace(index);
  }
  
}
