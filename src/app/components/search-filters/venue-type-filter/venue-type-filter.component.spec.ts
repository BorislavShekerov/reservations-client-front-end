/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VenueTypeFilterComponent } from './venue-type-filter.component';

describe('VenueTypeFilterComponent', () => {
  let component: VenueTypeFilterComponent;
  let fixture: ComponentFixture<VenueTypeFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueTypeFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueTypeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
