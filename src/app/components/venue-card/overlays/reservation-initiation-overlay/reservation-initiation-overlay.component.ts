import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReservationService } from '../../../../services/reservation.service';
import { Table } from '../../../../services/reservation.service';
import { AuthenticationService } from '../../../../services/user-authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationOverlayComponent } from '../../../overlays/reservation-overlay/reservation-overlay.component';

@Component({
  selector: 'app-reservation-initiation-overlay',
  templateUrl: './reservation-initiation-overlay.component.html',
  styleUrls: ['./reservation-initiation-overlay.component.scss'],
  providers: [ReservationService, AuthenticationService]
})
export class ReservationInitiationOverlayComponent implements OnInit {

  @Input() venueId: string;
  @Input() dateModel;
  @Input() peopleAttending: number;
  @Input() checkTriggeredFromOverlay: boolean;
  @Output() backTriggerEventEmitter: EventEmitter<boolean> = new EventEmitter();

  private freeTables: Table[];
  private loading: boolean = true;

  constructor(private reservationService: ReservationService, private authenticationService: AuthenticationService, private modalService: NgbModal) { }

  ngOnInit() {
    setTimeout(() => {
      this.reservationService.checkForTable(this.venueId, this.dateModel, this.peopleAttending).subscribe(tables => {
        this.freeTables = tables;
        this.loading = false;
      });
    }, 1500);
  }

  goBackToReservationCheckOverlay() {
    this.backTriggerEventEmitter.next(true);
  }

  reserveTable() {
    this.modalService.open(ReservationOverlayComponent);
  }
}
