import { Component, OnInit } from '@angular/core';
import { Geolocation } from '../geolocation';
import { LocationService } from '../../../services/location.service';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.css']
})
export class GpsComponent implements OnInit {

  constructor(public userGeoLoc: LocationService) { }

  ngOnInit() {
  }

}
