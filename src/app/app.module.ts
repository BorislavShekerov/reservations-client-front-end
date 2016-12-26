import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SearchComponent } from './components/search/search.component';
import { ListViewComponent } from './components/list-view/list-view.component';

import { AppRoutingModule }     from './app-routing.module';
import { PlaceCardComponent } from './components/place-card/place-card.component';

import { SearchService } from './services/search.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderNavComponent,
    SearchComponent,
     ListViewComponent,
     PlaceCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
