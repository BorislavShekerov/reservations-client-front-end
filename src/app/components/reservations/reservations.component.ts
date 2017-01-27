import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../model/reservation';
import { AuthenticationService } from '../../services/user-authentication.service';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs/Observable';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Http, URLSearchParams } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationDetailsOverlayComponent } from '../overlays/reservation-details-overlay/reservation-details-overlay.component';
import { UserStateChangeService } from '../../services/user-state-change.service';

export interface ReservationEvent extends CalendarEvent {
  reservation: Reservation;
}

interface Film {
  id: number;
  title: string;
  release_date: string;
}

interface FilmEvent extends CalendarEvent {
  film: Film;
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReservationService]
})
export class ReservationsComponent implements OnInit {

  private showLoadingSpinner: boolean = false;

  locale: string = 'bg';

  viewDate: Date = new Date();

  events: Observable<ReservationEvent[]>;

  private activeDayIsOpen: boolean = false;

  constructor(private http: Http, private reservationService: ReservationService, private authenticationService: AuthenticationService, private router: Router, private modalService: NgbModal, private userStateChangeService: UserStateChangeService) { }

  ngOnInit() {
    this.events = this.reservationService.getReservationsForUser();
    this.reservationService.reservationsRefreshTrigger.subscribe(refreshTrigerred => this.reservationService.getReservationsForUser());
    this.registerStateChangeListener();
  }

  dayClicked({date, events}: { date: Date, events: ReservationEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: any): void {
    const modalRef = this.modalService.open(ReservationDetailsOverlayComponent);
    modalRef.componentInstance.reservation = event.event.reservation;
  }

  registerStateChangeListener() {
    this.userStateChangeService.stateChangesStream
      .subscribe(newState => {
        if (newState == "reservations") {
          this.router.navigate([`/${newState}`]);
        } else if (newState == "search") {
          this.router.navigate([`/search/listview`]);
        }
      });
  }

}
