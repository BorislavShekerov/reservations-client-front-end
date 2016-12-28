import { Component, OnInit, ElementRef, ViewChild, Renderer, trigger, state, style, transition, animate } from '@angular/core';
import { I18n } from '../../services/custom-language-datepicker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Venue } from '../../model/venue';
import { PostFilterUrlPreparator } from '../../services/post-filter-url-preparation.service';
import { UrlToFilterDecoder } from '../../services/url-to-filters-decoder.service';

class UrlParam {
  name: string;
  paramValue: string;
}

class DateFilter {
  year: string;
  month: string;
  day: string;
}

export class VenueFilter {
  isFiltered: boolean;
  type: string;
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [UrlToFilterDecoder, PostFilterUrlPreparator, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
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


  private currentLocation: Location;
  private filtersExpanded: boolean = false;
  private venueTypeFilters: VenueFilter[] = [{ isFiltered: false, type: "Ресторант" }, { isFiltered: false, type: "Клуб" }, { isFiltered: false, type: "Кафе" }, { isFiltered: false, type: "Бар" }];
  private searchInputQuery: string = "";
  private searchTerms = new Subject<string>();
  private showFilterButton: boolean = true;
  private ageSliderModel: number = 2;

  @ViewChild('searchInputField') searchInputFiled: ElementRef;

  constructor(private renderer: Renderer, private router: Router, private location: Location, private postFilterUrlPreparator: PostFilterUrlPreparator, private urlToFilterDecoder: UrlToFilterDecoder) { this.currentLocation = location; }

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
    let urlContents: string[] = this.currentLocation.path().split("/");
    if (urlContents.length > 2) {

      this.searchInputQuery = this.urlToFilterDecoder.decodeSearchQuery(urlContents);
      this.dateModel = this.urlToFilterDecoder.decodeDateModel(urlContents);
      this.urlToFilterDecoder.decodeVenueTypeFilters(urlContents, this.venueTypeFilters);
    }
  }

  filterSearch() {
    let newUrl: string = this.postFilterUrlPreparator.prepareNewUrl(this.venueTypeFilters, this.dateModel, this.searchInputQuery);
    this.router.navigate([newUrl]);
  }

  venueTypeFilterClicked(filterClicked: VenueFilter) {
    for (let venue of this.venueTypeFilters) {
      if (venue.type == filterClicked.type) {
        venue.isFiltered = !filterClicked.isFiltered;
        break;
      }
    }

    this.filterSearch();
  }

  displayFilterButton(){
    if(!this.filtersExpanded){
      this.showFilterButton = true;
    }
  }

}
