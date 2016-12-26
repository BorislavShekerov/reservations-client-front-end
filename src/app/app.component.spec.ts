/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SearchComponent } from './components/search/search.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { PlaceCardComponent } from './components/place-card/place-card.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, HeaderNavComponent, SearchComponent, ListViewComponent, PlaceCardComponent
      ],
      imports: [AppRoutingModule]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    
  }));
});
