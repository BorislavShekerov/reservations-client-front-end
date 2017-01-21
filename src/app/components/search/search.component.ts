import { Component, OnInit, ElementRef, ViewChild, Renderer, trigger, state, style, transition, animate } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { PostFilterUrlPreparator } from '../../services/post-filter-url-preparation.service';
import { Observable } from 'rxjs/Observable';
import { Venue } from '../../model/venue';
import { UrlToFilterDecoder } from '../../services/url-to-filters-decoder.service';
import { Subject } from 'rxjs/Subject';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { I18n } from '../../services/custom-language-datepicker.service';
import { CustomDatepickerI18n } from '../../services/custom-language-datepicker.service';
import { VenueFilter } from '../search-filters/venue-type-filter/venue-type-filter.component';
import { slideInDownAnimation } from '../../animations/slide-in-down.animation';

class UrlParam {
  name: string;
  paramValue: string;
}

class DateFilter {
  year: string;
  month: string;
  day: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [UrlToFilterDecoder, PostFilterUrlPreparator, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }, I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
  animations: [slideInDownAnimation]
})
export class SearchComponent implements OnInit {
  private filtersExpanded: boolean = false;
  private searchInputQuery: string = "";
  private searchTerms = new Subject<string>();
  private showFilterButton: boolean = true;
  private ageSliderModel: number = 2;
  private dateModel: NgbDateStruct;
  private currentLocation: Location;
  private venueTypeFilters: VenueFilter[] = [{ isFiltered: false, type: "Ресторант" }, { isFiltered: false, type: "Клуб" }, { isFiltered: false, type: "Кафе" }, { isFiltered: false, type: "Бар" }];
  private peopleAttendingModel: number;
  private urlContents: string[];
  private chosenView: string;

  @ViewChild('searchInputField') searchInputFiled: ElementRef;

  constructor(private renderer: Renderer, private router: Router, private route: ActivatedRoute, private location: Location, private postFilterUrlPreparator: PostFilterUrlPreparator, private urlToFilterDecoder: UrlToFilterDecoder) {
    this.urlContents = location.path().split("/");
  }

  ngOnInit() {
    this.renderer.invokeElementMethod(this.searchInputFiled.nativeElement,
      'focus');

    this.initializeFilterFields();
    this.addSearchTermsSubscriber();
  }

  addSearchTerm() {
    this.searchTerms.next(this.searchInputQuery);
  }
  addSearchTermsSubscriber() {
    this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(searchTerm => this.filterSearch());
  }

  isDisplayedViewMap() {
    let currentLocation = this.location.path();
    if (currentLocation.indexOf("mapview") > -1) {
      this.showFilterButton = false;
      this.chosenView = 'mapview';
    } else {
      this.chosenView = 'listview';
    }

    return this.chosenView == 'mapview';
  }

  changeView(viewSelected: string) {
    let currentLocation = this.location.path();
    if (currentLocation.indexOf(viewSelected) == -1) {
      let newLocation: string;
      if (currentLocation.indexOf('listview') > -1) {
        newLocation = currentLocation.replace('listview', viewSelected);
      } else {
        newLocation = currentLocation.replace('mapview', viewSelected);
      }
      this.router.navigate([newLocation], { relativeTo: this.route });
    }
  }

  initializeFilterFields() {
    if (this.urlContents.length > 2) {
      this.searchInputQuery = this.urlToFilterDecoder.decodeSearchQuery(this.urlContents);
      this.dateModel = this.urlToFilterDecoder.decodeDateModel(this.urlContents);
      this.urlToFilterDecoder.decodeVenueTypeFilters(this.urlContents, this.venueTypeFilters);
      this.peopleAttendingModel = this.urlToFilterDecoder.decodePeopleGoingModel(this.urlContents);



      if (!this.peopleAttendingModel) {
        this.peopleAttendingModel = 2;
      }
    }
  }

  initializeTypeFilters(typesUrl: string) {
    let urlTypeFilterString: string = decodeURIComponent(typesUrl);
    let urlTypeFilterContents: string[] = urlTypeFilterString.split("+");

    this.venueTypeFilters.filter(venueTypeFilter => urlTypeFilterContents.indexOf(venueTypeFilter.type) > -1).forEach(venueTypeFilter => venueTypeFilter.isFiltered = true);
  }
  filterSearch() {
    let newUrl: string = this.postFilterUrlPreparator.prepareNewUrl(this.chosenView, this.venueTypeFilters, this.dateModel, this.searchInputQuery, this.peopleAttendingModel);
    this.router.navigate([newUrl], { relativeTo: this.route });
  }

  handleDateModelUpdate(updatedDateModel: NgbDateStruct) {
    this.dateModel = updatedDateModel;
    this.filterSearch();
  }

  handleVenueModelUpdate(updatedVenueFilters: VenueFilter[]) {
    this.venueTypeFilters = updatedVenueFilters;
    this.filterSearch();
  }

  handlePeopleGoingModelUpdate(updatedPeopleGoingModel: number) {
    this.peopleAttendingModel = updatedPeopleGoingModel;
    this.filterSearch();
  }

  displayFilterButton() {
    if (!this.filtersExpanded) {
      this.showFilterButton = true;
    }
  }
}
