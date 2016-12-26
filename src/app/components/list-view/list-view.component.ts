import { Component, OnInit } from '@angular/core';
import { PlaceCardComponent } from '../place-card/place-card.component'
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { SearchService } from '../../services/search.service';
import { Venue } from '../../model/venue';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  
  private query : String = "";
  private showLoadingSpinner : boolean = true;
  private venuesToDisplay : Venue[] = [];

  constructor( private route : ActivatedRoute,
  private location : Location, private searchService : SearchService) { }

  ngOnInit() {

    this.route.params.subscribe((params : Params) =>{
      let queryString : string = params['queryString'];
      
      setTimeout(() => {
       this.searchService.findVenues(queryString).subscribe(venues => {
         this.venuesToDisplay = venues;
         console.log(venues);
      })}, 1000);
    });

  }

}