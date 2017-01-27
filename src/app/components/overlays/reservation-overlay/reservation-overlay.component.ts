import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReservationService } from '../../../services/reservation.service'
@Component({
  selector: 'app-reservation-overlay',
  templateUrl: './reservation-overlay.component.html',
  styleUrls: ['./reservation-overlay.component.scss']
})
export class ReservationOverlayComponent implements OnInit {

  constructor(private modal: NgbActiveModal, private reservationService:ReservationService, private router: Router) {
  }

  ngOnInit() {
    
  }

}
