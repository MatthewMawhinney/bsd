import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
//import { JwtHelperService } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';


import { ValidateService } from './services/validate.service';
import { RegisterService } from './services/register.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapComponent } from './components/map/map.component';
import { SearchComponent } from './components/search/search.component';
import { PlacesComponent } from './components/places/places.component';
import { PlaceComponent } from './components/places/place/place.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    MapComponent,
    SearchComponent,
    PlacesComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsk8bH9eVGT9OZL4Timg7matKrTftgEGE',
      libraries: ['places']
    })
  ],
  providers: [
    ValidateService,
    RegisterService,
    AuthGuardService,
    //JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
