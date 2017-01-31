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
import { Venue } from '../model/venue';
import { Table } from '../model/table';

@Injectable()
export class ReservationService {

    private venueToReserveId: string;
    private dateModel;
    private peopleAttending: number;
    reservationsRefreshTrigger = new Subject<boolean>();

    constructor(private http: Http, private authenticationService: AuthenticationService, private userTokenRequestHandler: UserTokenRequestHandler, private userStateChangeService: UserStateChangeService) { }

    dataForReservation(venueId: string, dateModel, peopleAttending: number) {
        this.venueToReserveId = venueId;
        this.dateModel = dateModel;
        this.peopleAttending = peopleAttending;
    }

    getReservationsForUser(): Observable<ReservationEvent[]> {
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
                        color: COLORS.mainColor,
                        reservation
                    };
                });
            }).catch(this.handleError.bind(this));
    }

    reserveTable(venue: Venue, dateModel: NgbDateStruct, peopleAttending: number, tableToReserve: Table): Observable<boolean> {
        let reservationDate = this.stringifyDateStruct(dateModel);
        let reservation: Reservation = { peopleAttending: peopleAttending, reservationDate: reservationDate, tableReserved: tableToReserve, venue: venue };

        return this.http.post(RESERVATIONS_URL, reservation, this.userTokenRequestHandler.constructRequestHeaders(true))
            .map(res => Observable.of(true))
            .catch(this.handleError.bind(this));
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

    private handleTokenRefreshed() {
        this.reservationsRefreshTrigger.next(true);
    }

    private triggerTokenRefresh() {
        this.authenticationService.refreshAccessToken().subscribe(tokenRefreshed => this.handleTokenRefreshed(), errorCode => this.userStateChangeService.triggerStateChange("search"));
    }

    checkForTable(venueId: string, dateModel: NgbDateStruct, peopleAttending: number): Observable<Table[]> {
        let reservationDate = this.stringifyDateStruct(dateModel);

        return this.http
            .get(RESERVATIONS_URL + `/${venueId}/${reservationDate}/${peopleAttending}`)
            .map(res => {
                return res.json() as Table[];
            }).catch(this.handleError.bind(this));
    }

    stringifyDateStruct(dateModel: NgbDateStruct): string {
        let month: string = this.formatDateValue(dateModel.month);
        let day: string = this.formatDateValue(dateModel.day);

        return `${dateModel.year}-${month}-${day}`;
    }

    formatDateValue(dateVal: number): string {
        let formattedDateVal: string;

        if (dateVal < 10) {
            formattedDateVal = `0${dateVal}`;
        } else {
            formattedDateVal = "" + dateVal;
        }

        return formattedDateVal;
    }
}