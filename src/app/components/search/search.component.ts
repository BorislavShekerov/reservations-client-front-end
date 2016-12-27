import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../services/custom-language-datepicker.service';
import { I18n } from '../../services/custom-language-datepicker.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

class UrlParam {
  name: string;
  paramValue: string;
}

class DateFilter {
  year: string;
  month: string;
  day: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, Location, { provide: LocationStrategy, useClass: PathLocationStrategy }] // define custom NgbDatepickerI18n provider

})
export class SearchComponent implements OnInit {

  private dateModel: DateFilter;
  private date: NgbDateStruct;
  private filtersExpanded: boolean = false;
  private venueTypesFilters: string[] = ["Ресторант", "Клуб", "Кафе", "Бар"];
  private currentLocation: Location;
  private searchInput: string = "123";

  @ViewChild('searchInputField') searchInputFiled: ElementRef;

  constructor(private renderer: Renderer, private router: Router, private location: Location) { this.currentLocation = location; }

  ngOnInit() {
    this.renderer.invokeElementMethod(this.searchInputFiled.nativeElement,
      'focus');

    this.initializeFilterFields();
  }

  initializeFilterFields(){
    let urlContents: string[] = this.currentLocation.path().split("/");
    if (urlContents.length > 2) {
      if (urlContents[2] != "date") {
        this.searchInput = urlContents[2];
      }

      if (urlContents.indexOf("date") > -1) {
        let urlDateFilterString: string = urlContents[urlContents.indexOf("date") + 1];
        let urlDateFilterContents: string[] = urlDateFilterString.split("-");
        this.date = { year: +urlDateFilterContents[0], month: +urlDateFilterContents[1], day: +urlDateFilterContents[2] };
      }
    }
  }

  filterSearch() {
    let dateModelString = `${this.date.year}-${this.date.month}-${this.date.day}`;
    this.router.navigate([`/listview/${this.searchInput}/date/${dateModelString}`]);
    
    console.log("updating-search");
  }

}
