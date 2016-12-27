import { Injectable } from '@angular/core';
import { Venue } from '../model/venue';
import {Observable} from 'rxjs/Observable';
import { VENUES } from '../model/mock-venues';
@Injectable()
export class SearchService {

    private venuesUrl = 'api/venues';

    findVenues(searchTerm: string): Observable<Venue[]> {
        return new Observable(observer => {
            observer.next(VENUES);
            observer.complete();

            // Note that this is optional, you do not have to return this if you require no cleanup
            return function () { console.log('disposed');};
        });
    }
}