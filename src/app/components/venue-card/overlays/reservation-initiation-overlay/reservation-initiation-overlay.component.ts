import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from '../../../../services/reservation.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Table } from '../../../../services/reservation.service';

@Component({
  selector: 'app-reservation-initiation-overlay',
  templateUrl: './reservation-initiation-overlay.component.html',
  styleUrls: ['./reservation-initiation-overlay.component.scss'],
  providers: [ReservationService]
})
export class ReservationInitiationOverlayComponent implements OnInit {

  @Input() venueId: string;
  @Input() dateModel: NgbDateStruct;
  @Input() peopleAttending: number;
  private freeTables: Table[];
  private loading: boolean = true;

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    setTimeout(() => {
      this.reservationService.checkForTable(this.venueId, this.dateModel, this.peopleAttending).subscribe(tables => {
        this.freeTables = tables;
        this.loading = false;
      });
    }, 1500);
  }

}
