import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RegisterService } from '../../services/register.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
//import { User } from './User.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  favourites: any[] = [];
    /*{
      "_id": {
        "$oid": "5b15e88afb6fc02bcb8e3c6c"
      },
      "geometry": {
        "location": {
          "lat": 43.6414378,
          "lng": -79.3893532
        },
        "viewport": {
          "northeast": {
            "lat": 43.64273939999999,
            "lng": -79.38611175
          },
          "southwest": {
            "lat": 43.63974380000001,
            "lng": -79.39256234999999
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
      "id": "48220ce6304eea2dcc8cca5014d2247fc80d0da0",
      "name": "Rogers Centre",
      "photos": [
        {
          "height": 1944,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/106074343815829479312/photos\">Lars Richter<\/a>"
          ],
          "photo_reference": "CmRaAAAA9a0Df2MiH0rMeVuok_ziQfxAL5HgM4522wREThARNP9RrjsNWI_bwBlaTdL8BQY-Qv-AoKsxtoCAReIG10bwxuEBBjuq4Ch9pFh4asvvkpIes3R0hiZOy1s9Sfch2GM5EhAphdfXWosWGeXMuzIKhNbgGhT4SHzLqwo_WIbTDEQG-OR__xC9NA",
          "width": 2896
        }
      ],
      "place_id": "ChIJUUpqttc0K4gRBRQL_vayEOI",
      "rating": 4.4,
      "reference": "CmRSAAAADb_Z-mOFrE5-GW0uiiwPJQlp9QtuB0fTWzZO9zg8neMjj9CIMzK5_4HKxKqTQCAQf72pMmOsuBUpRr-FfFwfgppgeFlJnolc2qeXTF_6HOKCBJm3Aj0AiT_t9RC5h2SCEhCJO2YJu71Nx8BZYFeLD10FGhR8r9XXomNHy7Zcau1UXdD0PU7Cjw",
      "scope": "GOOGLE",
      "types": [
        "stadium",
        "point_of_interest",
        "establishment"
      ],
      "vicinity": "1 Blue Jays Way, Toronto"
    }*/

  constructor(
    private registerService: RegisterService, 
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      favourites: this.favourites
    }

    if(!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Error: All fields are required!', {cssClass: 'flashValidate-err', timeout: 5000});
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email!', { cssClass: 'flashValidate-err', timeout: 5000 });
      return false;
    }

    //Register User
    console.log(user);
    this.registerService.registerUser(user).subscribe(data => {
      if(data.success) {
        this.flashMessage.show('Welcome to Backseat Driver!', { cssClass: 'flashValidate-suc', timeout: 5000 });
        //this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong...', { cssClass: 'flashValidate-err', timeout: 5000 });
      }
    });
  }
}