import { Component, OnInit } from '@angular/core';
import { PlaceCardComponent } from '../venue-card/venue-card.component'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { SearchService } from '../../services/search.service';
import { Venue } from '../../model/venue';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {

  private query: String = "";
  showLoadingSpinner: boolean = true;
  private venuesToDisplay: Venue[];
  private dateSearchCriteria: string;
  private peopleAttendingSearchCriteria: string;

  constructor(private route: ActivatedRoute,
    private location: Location, private searchService: SearchService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let queryString: string = params['queryString'];
      this.dateSearchCriteria = params['date'];
      this.peopleAttendingSearchCriteria = params['peopleGoing'];

      this.showLoadingSpinner = true;

      this.searchService.findVenues(queryString)
        .subscribe(venues => {
          this.showLoadingSpinner = false;
          this.venuesToDisplay = venues;
        });
    });

  }

}
