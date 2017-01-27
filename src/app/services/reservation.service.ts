import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { RESERVATIONS_URL } from '../model/api-urls';
import { Reservation } from '../model/reservation';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from './user-authentication.service';
import { UserTokenRequestHandler } from './user-token-request-handler.service';
import { ReservationEvent } from '../components/reservations/reservations.component';
import { COLORS } from '../model/colors';
import { Subject } from 'rxjs/Subject';
import { UserStateChangeService } from './user-state-change.service';

export class Table {
    capacity: number;
}
@Injectable()
export class ReservationService {

    private tables: Table[] = [{ capacity: 4 }, { capacity: 4 }];
    private venueToReserveId: string;
    private dateModel;
    private peopleAttending: number;
    reservationsRefreshTrigger = new Subject<boolean>();

    constructor(private http: Http, private authenticationService: AuthenticationService, private userTokenRequestHandler: UserTokenRequestHandler, private userStateChangeService:UserStateChangeService) { }

    dataForReservation(venueId: string, dateModel, peopleAttending: number) {
        this.venueToReserveId = venueId;
        this.dateModel = dateModel;
        this.peopleAttending = peopleAttending;
    }

    getReservationsForUser(): Observable<ReservationEvent[]> {
        this.authenticationService;
        return this.http
            .get(RESERVATIONS_URL, this.userTokenRequestHandler.constructRequestHeaders(true))
            .map(res => {
                return res.json() as Reservation[];
            })
            .map((results: Reservation[]) => {
                return results.map((reservation: Reservation) => {
                    let reservationDate = reservation.reservationDate;

                    return {
                        title: reservation.venue.name,
                        start: new Date('' + reservationDate[0] + '-' + reservationDate[1] + '-' + reservationDate[2]),
                        color: COLORS.yellow,
                        reservation
                    };
                });
            }).catch(this.handleError.bind(this));
    }

    handleError(error: Response | any) {
        let errorCode: number;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);

            errorCode = body.errorCode;

            if (errorCode == 11) {
                this.triggerTokenRefresh();
            } 
        } else {
            errorCode = 0;
        }
        console.error(errorCode);
        return Observable.throw(errorCode);
    }

    private handleTokenRefreshed(){
        this.reservationsRefreshTrigger.next(true);
    }

    private triggerTokenRefresh(){
        this.authenticationService.refreshAccessToken().subscribe(tokenRefreshed => this.handleTokenRefreshed(),errorCode => this.userStateChangeService.triggerStateChange("search"));
    }


    checkForTable(venueId: string, dateModel: NgbDateStruct, peopleAttending: number): Observable<Table[]> {
        return new Observable(observer => {
            observer.next(this.tables);
            observer.complete();

            // Note that this is optional, you do not have to return this if you require no cleanup
            return function () { console.log('disposed'); };
        });
    }
}