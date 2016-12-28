import { Component, OnInit } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../services/custom-language-datepicker.service';
import { I18n } from '../../services/custom-language-datepicker.service';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }]
})
export class SearchFiltersComponent implements OnInit {
    private dateModel: NgbDateStruct;

  constructor() { }

  ngOnInit() {
  }

}
