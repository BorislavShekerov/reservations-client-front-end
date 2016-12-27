import { Component, OnInit, Input } from '@angular/core';
import { Venue } from '../../model/venue';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.scss']
})
export class PlaceCardComponent implements OnInit {

  @Input()
  venue: Venue;

  constructor() { }

  ngOnInit() {
  }

}
