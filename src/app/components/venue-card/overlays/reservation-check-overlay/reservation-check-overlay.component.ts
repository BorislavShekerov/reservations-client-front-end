import { Component, OnInit, Input, Output, trigger, state, style, transition, animate, EventEmitter } from '@angular/core';
import { Venue } from '../../../../model/venue';
import { Observable } from 'rxjs/Observable';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { I18n } from '../../../../services/custom-language-datepicker.service';
import { CustomDatepickerI18n } from '../../../../services/custom-language-datepicker.service';
import { slideInRightAnimation } from '../../../../animations/slide-in-right.animation';
@Component({
  selector: 'app-reservation-check-overlay',
  templateUrl: './reservation-check-overlay.component.html',
  styleUrls: ['./reservation-check-overlay.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
  animations: [slideInRightAnimation]
})
export class ReservationCheckOverlayComponent implements OnInit {
  private animationSlideIn: boolean = true;
  
  @Input() venue: Venue;
  @Input() private peopleAttending: number;
  @Input() private dateModel;
  @Output() overlayCloseEventEmitter: EventEmitter<any> = new EventEmitter();
  @Output() freeTablesCheckEventEmitter: EventEmitter<any> = new EventEmitter();

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

  triggerFreeTablesCheck(){
    let criteriaToCheckFor = {peopleAttending: this.peopleAttending, dateModel: this.dateModel};

    this.freeTablesCheckEventEmitter.next(criteriaToCheckFor);
  }
}
