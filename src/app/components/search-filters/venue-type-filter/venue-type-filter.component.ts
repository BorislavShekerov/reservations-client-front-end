import { Component, Input, Output, EventEmitter } from '@angular/core';

export class VenueFilter {
  isFiltered: boolean;
  type: string;
}

@Component({
  selector: 'app-venue-type-filter',
  templateUrl: './venue-type-filter.component.html',
  styleUrls: ['./venue-type-filter.component.scss']
})
export class VenueTypeFilterComponent {
  @Input() venueTypeFilters: VenueFilter[];
  @Output() venueModelUpdate: EventEmitter<VenueFilter[]> = new EventEmitter();

  venueTypeFilterClicked(filterClicked: VenueFilter) {
    for (let venue of this.venueTypeFilters) {
      if (venue.type == filterClicked.type) {
        venue.isFiltered = !filterClicked.isFiltered;
        break;
      }
    }

    this.venueModelUpdate.next(this.venueTypeFilters);
  }

}
