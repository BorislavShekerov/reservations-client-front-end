import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReservationService } from '../../../../services/reservation.service';
import { Table } from '../../../../model/table';
import { AuthenticationService } from '../../../../services/user-authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationOverlayComponent } from '../../../overlays/authentication-overlay/authentication-overlay.component';
import { ReservationOverlayComponent } from '../../../overlays/reservation-overlay/reservation-overlay.component';
import { Venue } from '../../../../model/venue';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation-initiation-overlay',
  templateUrl: './reservation-initiation-overlay.component.html',
  styleUrls: ['./reservation-initiation-overlay.component.scss'],
  providers: [ReservationService, AuthenticationService]
})
export class ReservationInitiationOverlayComponent implements OnInit {

  @Input() venue: Venue;
  @Input() dateModel: any;
  @Input() peopleAttending: number;
  @Input() checkTriggeredFromOverlay: boolean;
  @Output() backTriggerEventEmitter: EventEmitter<boolean> = new EventEmitter();

  private freeTables: Table[];
  private loading: boolean = true;
  private waitingForReservationResponse: boolean = false;
  private reservationSuccess: boolean = false;

  constructor(private reservationService: ReservationService, private authenticationService: AuthenticationService, private modalService: NgbModal) { }

  ngOnInit() {
    setTimeout(() => {
      this.reservationService.checkForTable(this.venue.id, this.dateModel, this.peopleAttending).subscribe(tables => {
        this.freeTables = tables;
        this.loading = false;
      });
    }, 1500);
  }

  goBackToReservationCheckOverlay() {
    this.backTriggerEventEmitter.next(true);
  }

  reserveTable() {
    if (!this.authenticationService.isUserAuthenticated()) {
      this.modalService.open(AuthenticationOverlayComponent);
    }else{
      this.waitingForReservationResponse = true;
      this.reservationService.reserveTable(this.venue, this.dateModel, this.peopleAttending, this.freeTables[0]).subscribe(resp => {
        this.waitingForReservationResponse = false;
        this.reservationSuccess = true;
      });
    }
  }
}
