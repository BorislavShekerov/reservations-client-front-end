import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-attendance-filter',
  templateUrl: './people-attendance-filter.component.html',
  styleUrls: ['./people-attendance-filter.component.scss']
})
export class PeopleAttendanceFilterComponent implements OnInit {
  @Input() peopleGoingModel: number;
  @Output() peopleGoingModelUpdate: EventEmitter<number> = new EventEmitter();
  
  ngOnInit(){
    if(!this.peopleGoingModel){
      this.peopleGoingModel = 2;
    }
  }
  peopleGoingUpdate(updatedPeopleGoingEvent) {
    this.peopleGoingModel = updatedPeopleGoingEvent.value;

    this.peopleGoingModelUpdate.next(this.peopleGoingModel);
  }

}
