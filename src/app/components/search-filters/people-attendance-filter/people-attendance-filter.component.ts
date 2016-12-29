import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-people-attendance-filter',
  templateUrl: './people-attendance-filter.component.html',
  styleUrls: ['./people-attendance-filter.component.scss']
})
export class PeopleAttendanceFilterComponent {
  @Input() peopleGoingModel: number;
  @Output() peopleGoingModelUpdate: EventEmitter<number> = new EventEmitter();
  
  peopleGoingUpdate(updatedPeopleGoingEvent) {
    this.peopleGoingModel = updatedPeopleGoingEvent.value;

    this.peopleGoingModelUpdate.next(this.peopleGoingModel);
  }

}
