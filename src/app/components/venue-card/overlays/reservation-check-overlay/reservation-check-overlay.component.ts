import { Component, OnInit, Input, Output, trigger, state, style, transition, animate, EventEmitter } from '@angular/core';
import { Venue } from '../../../../model/venue';
import { Observable } from 'rxjs/Observable';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { I18n } from '../../../../services/custom-language-datepicker.service';
import { CustomDatepickerI18n } from '../../../../services/custom-language-datepicker.service';

@Component({
  selector: 'app-reservation-check-overlay',
  templateUrl: './reservation-check-overlay.component.html',
  styleUrls: ['./reservation-check-overlay.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
  animations: [
    trigger(
      'slideRightIn', [
        transition(':enter', [
          style({ transform: 'translateX(-30%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', 'opacity': 1 }),
          animate('500ms', style({ transform: 'translateX(-100%)', opacity: 0 }))
        ])
      ]
    )
  ]
})
export class ReservationCheckOverlayComponent implements OnInit {
  private animationSlideIn: boolean = true;
  
  @Input() venue: Venue;
  @Input() private peopleAttending: number;
  @Input() private dateModel: NgbDateStruct;
  @Output() overlayCloseEventEmitter: EventEmitter<any> = new EventEmitter();

  constructor(private _i18n: I18n) { this._i18n.language = "bgShort"; }

  ngOnInit() {
    let now: Date = new Date();
    this.dateModel = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };

    if (!this.peopleAttending) {
      this.peopleAttending = 2;
    }
  }

  handlePeopleGoingModelUpdate(uprdatedPeopleModel: number) {
    this.peopleAttending = uprdatedPeopleModel;
  }

  checkSlideInDirection() {
    if (!this.animationSlideIn) {
      this.overlayCloseEventEmitter.next('closed');
    }
  }
}
