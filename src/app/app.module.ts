import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import './rxjs-extensions';
import { SliderModule } from 'primeng/primeng';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SearchComponent } from './components/search/search.component';
import { ListViewComponent } from './components/list-view/list-view.component';

import { AppRoutingModule } from './app-routing.module';
import { PlaceCardComponent } from './components/venue-card/venue-card.component';

import { SearchService } from './services/search.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthenticationService } from './services/user-authentication.service';

import { VenueTypeFilterComponent } from './components/search-filters/venue-type-filter/venue-type-filter.component';
import { ReservationDateFilterComponent } from './components/search-filters/reservation-date-filter/reservation-date-filter.component';
import { PeopleAttendanceFilterComponent } from './components/search-filters/people-attendance-filter/people-attendance-filter.component';
import { ReservationCheckOverlayComponent } from './components/venue-card/overlays/reservation-check-overlay/reservation-check-overlay.component';
import { ReservationInitiationOverlayComponent } from './components/venue-card/overlays/reservation-initiation-overlay/reservation-initiation-overlay.component';
import { ReservationOverlayComponent } from './components/overlays/reservation-overlay/reservation-overlay.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthenticatedAppComponent } from './components/authenticated-app/authenticated-app.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { SignupFormComponent } from './components/forms/signup-form/signup-form.component';
import { SideBarComponent } from './components/authenticated-app/side-bar/side-bar.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { AuthenticationOverlayComponent } from './components/overlays/authentication-overlay/authentication-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    SearchComponent,
    ListViewComponent,
    PlaceCardComponent,
    VenueTypeFilterComponent,
    ReservationDateFilterComponent,
    PeopleAttendanceFilterComponent,
    ReservationCheckOverlayComponent,
    ReservationInitiationOverlayComponent,
    ReservationOverlayComponent,
    PageNotFoundComponent,
    AppComponent,
    AuthenticatedAppComponent,
    LoginFormComponent,
    SignupFormComponent,
    SideBarComponent,
    MapViewComponent,
    AuthenticationOverlayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    SliderModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAyhUakPzZpZZir-IkLWLfFOLhvQvbNSkM'
    })
  ],
  providers: [SearchService, AuthGuard, AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [AuthenticationOverlayComponent, ReservationOverlayComponent]
})
export class AppModule { }
