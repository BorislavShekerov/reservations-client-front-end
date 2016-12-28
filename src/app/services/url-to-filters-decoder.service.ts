import { Injectable } from '@angular/core';
import { VenueFilter } from '../components/search/search.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class UrlToFilterDecoder {

    decodeVenueTypeFilters(urlContents: string[], venueTypeFilters: VenueFilter[]) {
        if (urlContents.indexOf("type") > -1) {
            let urlTypeFilterString: string = decodeURIComponent(urlContents[urlContents.indexOf("type") + 1]);
            let urlTypeFilterContents: string[] = urlTypeFilterString.split("+");

            venueTypeFilters.filter(venueTypeFilter => urlTypeFilterContents.indexOf(venueTypeFilter.type) > -1).forEach(venueTypeFilter => venueTypeFilter.isFiltered = true);
        }
    }

    decodeDateModel(urlContents: string[]): NgbDateStruct {
        let dateModel: NgbDateStruct;

        if (urlContents.indexOf("date") > -1) {
            let urlDateFilterString: string = urlContents[urlContents.indexOf("date") + 1];
            let urlDateFilterContents: string[] = urlDateFilterString.split("-");
            dateModel = { year: +urlDateFilterContents[0], month: +urlDateFilterContents[1], day: +urlDateFilterContents[2] };
        }
        return dateModel;
    }

    decodeSearchQuery(urlContents: string[]): string {
        let searchInputQuery: string;
        if (urlContents[2] != "date" && urlContents[2] != "type") {
            searchInputQuery = urlContents[2];
        }

        return searchInputQuery;
    }

}