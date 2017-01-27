import { Injectable } from '@angular/core';
import { Venue } from '../model/venue';
import { Observable } from 'rxjs/Observable';
import { VENUES } from '../model/mock-venues';
import { Http, Response } from '@angular/http';

@Injectable()
export class SearchService {

    private VENUE_SERVICE_URL:string = "/api/venue-api/venues/"; 

    constructor(private http: Http) {}
    
    findVenues(searchTerm: string): Observable<Venue[]> {
        return this.http
               .get(this.VENUE_SERVICE_URL)
               .map((r: Response) => {
                  return r.json() as Venue[];
               });
    }
}