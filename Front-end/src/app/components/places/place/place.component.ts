import {Component, OnInit, Input} from '@angular/core';
import {Place} from "../place";
import {PlaceService} from "../../../services/place.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {CommsService} from '../../../services/comms.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  @Input() place: Place[];
  showFav: boolean;

  testRating(rating) {
    if (rating < 2.5) {
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

  constructor(
    private placeService: PlaceService,
    private flashMessage: FlashMessagesService,
    private commsService: CommsService
  ) {
  }

  ngOnInit() {
    this.commsService.showFavs.subscribe(data => this.showFav = data);
  }

  addPin(place: Place) {
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const newPlace = {
      uid: user.id,
      place: place
    };
    console.log(newPlace);
    this.placeService.updateFavs(newPlace).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Added Pin!', {cssClass: 'flashValidate-suc', timeout: 5000});
      } else {
        this.flashMessage.show('Could not add Pin.', {cssClass: 'flashValidate-err', timeout: 5000});
      }
    });
  }

}
