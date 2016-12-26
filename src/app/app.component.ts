import { Component } from '@angular/core';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';
}
