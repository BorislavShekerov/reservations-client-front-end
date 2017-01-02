import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Venue } from '../../model/venue';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  lat: number = 42.6975100;
  lng: number = 23.3241500;

  private isVenueSelected: boolean = false;
  private showLoadingSpinner: boolean = true;
  private venuesToDisplay: Venue[];
  private selectedVenue: Venue;
  private peopleAttending: number;
  private dateModel;
  private freeTablesCheckTriggered:boolean = false;

  constructor(private route: ActivatedRoute, private searchService: SearchService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let queryString: string = params['queryString'];

      this.showLoadingSpinner = true;
      setTimeout(() => {
        this.searchService.findVenues(queryString)
          .subscribe(venues => {
            this.venuesToDisplay = venues;
            this.showLoadingSpinner = false;
          });
      }, 1500);
    });

  }

  triggerFreeTablesCheck(criteriaToCheckFor){
    this.freeTablesCheckTriggered = true;
    this.dateModel = criteriaToCheckFor.dateModel;
    this.peopleAttending = criteriaToCheckFor.peopleAttending;
  }
  venueClicked(venue){
    this.selectedVenue = venue;
    this.isVenueSelected = true;
  }
}
