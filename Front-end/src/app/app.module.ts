import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import { ValidateService } from './services/validate.service';
import { RegisterService } from './services/register.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SearchComponent } from './components/search/search.component';
import { GpsComponent } from './components/search/gps/gps.component';
// import { UserLocationComponent } from './components/search/user-location/user-location.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    SearchComponent,
    GpsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
