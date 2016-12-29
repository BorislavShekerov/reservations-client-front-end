import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import './rxjs-extensions';
import { SliderModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SearchComponent } from './components/search/search.component';
import { ListViewComponent } from './components/list-view/list-view.component';

import { AppRoutingModule } from './app-routing.module';
import { PlaceCardComponent } from './components/place-card/place-card.component';

import { SearchService } from './services/search.service';
import { VenueTypeFilterComponent } from './components/search-filters/venue-type-filter/venue-type-filter.component';
import { ReservationDateFilterComponent } from './components/search-filters/reservation-date-filter/reservation-date-filter.component';
import { PeopleAttendanceFilterComponent } from './components/search-filters/people-attendance-filter/people-attendance-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    SearchComponent,
    ListViewComponent,
    PlaceCardComponent,
    VenueTypeFilterComponent,
    ReservationDateFilterComponent,
    PeopleAttendanceFilterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    NgbModule.forRoot(),
    SliderModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
