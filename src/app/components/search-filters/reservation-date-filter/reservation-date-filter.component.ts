import { Component, Input, Output, EventEmitter } from '@angular/core';
import { I18n } from '../../../services/custom-language-datepicker.service';
import { CustomDatepickerI18n } from '../../../services/custom-language-datepicker.service';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reservation-date-filter',
  templateUrl: './reservation-date-filter.component.html',
  styleUrls: ['./reservation-date-filter.component.scss'],
  providers: [  I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class ReservationDateFilterComponent {

  @Input() dateModel;
  @Output() dateModelUpdate: EventEmitter<any> = new EventEmitter();

  dateModelChanged() {
    this.dateModelUpdate.next(this.dateModel);
  }

}
