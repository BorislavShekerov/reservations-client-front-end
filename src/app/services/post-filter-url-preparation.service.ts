import { Injectable } from '@angular/core';
import { VenueFilter } from '../components/search/search.component';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

/**
 * A class to represent a REST-type partiotion of a url to constant and variable parts
 * eg. /listview/abcd - /listview is the constant part and abcd is the variable argument
 */
class UrlPartition {
    constantPart: string;
    variablePart: string;
}

@Injectable()
export class PostFilterUrlPreparator {

    prepareNewUrl(venueTypesFilters: VenueFilter[], dateModel: NgbDateStruct, searchInputQuery: string): string {
        let newUrlPartitions: UrlPartition[] = [];
        let venueFiltersSelected: VenueFilter[] = venueTypesFilters.filter(venueFilter => venueFilter.isFiltered);

        if (venueFiltersSelected.length > 0) {
            let venueFiltersConcatString = venueFiltersSelected.map(venueFilter => venueFilter.type).join("+");
            newUrlPartitions.push({ constantPart: "/type/", variablePart: venueFiltersConcatString });
        }
        if (dateModel) {
            let dateModelString = `${dateModel.year}-${dateModel.month}-${dateModel.day}`;
            newUrlPartitions.push({ constantPart: "/date/", variablePart: dateModelString });
        }

        let newUrlString = "/listview";
        if (searchInputQuery) {
            newUrlString += "/" + searchInputQuery;
        }

        newUrlPartitions.forEach(newUrlPartition => newUrlString += newUrlPartition.constantPart + newUrlPartition.variablePart);

        return newUrlString;
    }
}