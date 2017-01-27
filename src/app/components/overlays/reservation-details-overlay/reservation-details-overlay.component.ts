import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Reservation } from '../../../model/reservation';

@Component({
  selector: 'app-reservation-details-overlay',
  templateUrl: './reservation-details-overlay.component.html',
  styleUrls: ['./reservation-details-overlay.component.scss']
})
export class ReservationDetailsOverlayComponent implements OnInit {

  @Input() reservation: Reservation;

  constructor(private modal: NgbActiveModal) { }

  ngOnInit() {
  }

}
