import { Component, OnInit, ElementRef, ViewChild, Renderer, trigger, state, style, transition, animate } from '@angular/core';
import { Router } from '@angular/router';
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
  animations: [
    trigger(
      'myAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(-100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', 'opacity': 1 }),
          animate('500ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ])
      ]
    )
  ]
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
  private peopleGoingModel: number;
  private urlContents: string[];

  @ViewChild('searchInputField') searchInputFiled: ElementRef;

  constructor(private renderer: Renderer, private router: Router, private location: Location, private postFilterUrlPreparator: PostFilterUrlPreparator, private urlToFilterDecoder: UrlToFilterDecoder) { this.urlContents = location.path().split("/"); }

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

  initializeFilterFields() {
    if (this.urlContents.length > 2) {
      this.searchInputQuery = this.urlToFilterDecoder.decodeSearchQuery(this.urlContents);
      this.dateModel = this.urlToFilterDecoder.decodeDateModel(this.urlContents);
      this.urlToFilterDecoder.decodeVenueTypeFilters(this.urlContents, this.venueTypeFilters);
      this.peopleGoingModel = this.urlToFilterDecoder.decodePeopleGoingModel(this.urlContents);
    }
  }

  filterSearch() {
    let newUrl: string = this.postFilterUrlPreparator.prepareNewUrl(this.venueTypeFilters, this.dateModel, this.searchInputQuery, this.peopleGoingModel);
    this.router.navigate([newUrl]);
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
    this.peopleGoingModel = updatedPeopleGoingModel;
    this.filterSearch();
  }

  displayFilterButton() {
    if (!this.filtersExpanded) {
      this.showFilterButton = true;
    }
  }
}
