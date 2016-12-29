import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class Table{
    capacity:number;
}
@Injectable()
export class ReservationService {
    private tables:Table[] = [{capacity:4},{capacity:4}];

    checkForTable(venueId: string, dateModel: NgbDateStruct, peopleAttending: number): Observable<Table[]>{
        return new Observable(observer => {
            observer.next(this.tables);
            observer.complete();

            // Note that this is optional, you do not have to return this if you require no cleanup
            return function () { console.log('disposed'); };
        });
    }
}