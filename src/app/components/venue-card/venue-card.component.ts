import { Component, OnInit, Input, trigger, state, style, transition, animate } from '@angular/core';
import { Venue } from '../../model/venue';
import { Observable } from 'rxjs/Observable';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { I18n } from '../../services/custom-language-datepicker.service';
import { CustomDatepickerI18n } from '../../services/custom-language-datepicker.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-venue-card',
  templateUrl: './venue-card.component.html',
  styleUrls: ['./venue-card.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }],
})
export class PlaceCardComponent implements OnInit {
  @Input()venue: Venue;
  private dateModel: NgbDateStruct;
  private peopleAttending: number;
  private showOverlay: boolean = false;
  private checkTriggeredFromOverlay: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let queryString: string = params['queryString'];
      let dateSearchCriteria = params['date'];
      this.peopleAttending = +params['peopleAttending'];
      
      if (dateSearchCriteria) {
        let dateCriteriaContent = dateSearchCriteria.split("-");
        this.dateModel = { year: +dateCriteriaContent[0], month: +dateCriteriaContent[1], day: +dateCriteriaContent[2] };
      }
    });
  }

  triggerFreeTablesCheck(criteriaToCheckFor){
    this.checkTriggeredFromOverlay = true;
    this.dateModel = criteriaToCheckFor.dateModel;
    this.peopleAttending = criteriaToCheckFor.peopleAttending;
  }

  resetReservationCriteria(){
    this.dateModel = null;
  }
}
