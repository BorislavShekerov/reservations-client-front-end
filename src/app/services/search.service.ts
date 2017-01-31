import { Injectable } from '@angular/core';
import { Venue } from '../model/venue';
import { Observable } from 'rxjs/Observable';
import { VENUES } from '../model/mock-venues';
import { Http, Response } from '@angular/http';
import { VENUES_API_URL } from '../model/api-urls';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {

    constructor(private http: Http) { }

    findVenues(searchTerm: string): Observable<Venue[]> {
        if (!searchTerm) {
            return this.http
                .get(VENUES_API_URL)
                .map((r: Response) => {
                    return r.json() as Venue[];
                });
        }

        return this.http
            .get(VENUES_API_URL + "search/" + searchTerm)
            .map((r: Response) => {
                return r.json() as Venue[];
            });
    }
}