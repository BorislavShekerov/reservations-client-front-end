import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './components/list-view/list-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { AuthenticatedAppComponent } from './components/authenticated-app/authenticated-app.component';

const routes: Routes = [

  { path: '', redirectTo: '/search/listview', pathMatch: 'full' },
  {
    path: 'search',
    component: SearchComponent,
    children: [
      { path: 'listview', component: ListViewComponent },
      { path: 'listview/:queryString', component: ListViewComponent },

      { path: 'listview/type/:type', component: ListViewComponent },
      { path: 'listview/:queryString/type/:type', component: ListViewComponent },

      { path: 'listview/date/:date', component: ListViewComponent },
      { path: 'listview/:queryString/date/:date', component: ListViewComponent },
      { path: 'listview/type/:type/date/:date', component: ListViewComponent },
      { path: 'listview/:queryString/type/:type/date/:date', component: ListViewComponent },

      { path: 'listview/peopleAttending/:peopleAttending', component: ListViewComponent },
      { path: 'listview/:queryString/peopleAttending/:peopleAttending', component: ListViewComponent },
      { path: 'listview/type/:type/peopleAttending/:peopleAttending', component: ListViewComponent },
      { path: 'listview/:queryString/type/:type/peopleAttending/:peopleAttending', component: ListViewComponent },
      { path: 'listview/date/:date/peopleAttending/:peopleAttending', component: ListViewComponent },
      { path: 'listview/:queryString/date/:date/peopleAttending/:peopleAttending', component: ListViewComponent },
      { path: 'listview/type/:type/date/:date/peopleAttending/:peopleAttending', component: ListViewComponent },
      { path: 'listview/:queryString/type/:type/date/:date/peopleAttending/:peopleAttending', component: ListViewComponent },
    ]
  },
  { path: 'app',
    component: AuthenticatedAppComponent
  },

  { path: '**', component: PageNotFoundComponent },

  //{ path: 'listview', component: ListViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }