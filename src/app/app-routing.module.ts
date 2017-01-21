import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './components/list-view/list-view.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { AuthenticatedAppComponent } from './components/authenticated-app/authenticated-app.component';
import { AuthGuard } from './services/auth-guard.service';
import { MapViewComponent } from './components/map-view/map-view.component'
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
      { path: 'mapview', component: MapViewComponent },
      { path: 'mapview/:queryString', component: MapViewComponent },

      { path: 'mapview/type/:type', component: MapViewComponent },
      { path: 'mapview/:queryString/type/:type', component: MapViewComponent },

      { path: 'mapview/date/:date', component: MapViewComponent },
      { path: 'mapview/:queryString/date/:date', component: MapViewComponent },
      { path: 'mapview/type/:type/date/:date', component: MapViewComponent },
      { path: 'mapview/:queryString/type/:type/date/:date', component: MapViewComponent },

      { path: 'mapview/peopleAttending/:peopleAttending', component: MapViewComponent },
      { path: 'mapview/:queryString/peopleAttending/:peopleAttending', component: MapViewComponent },
      { path: 'mapview/type/:type/peopleAttending/:peopleAttending', component: MapViewComponent },
      { path: 'mapview/:queryString/type/:type/peopleAttending/:peopleAttending', component: MapViewComponent },
      { path: 'mapview/date/:date/peopleAttending/:peopleAttending', component: MapViewComponent },
      { path: 'mapview/:queryString/date/:date/peopleAttending/:peopleAttending', component: MapViewComponent },
      { path: 'mapview/type/:type/date/:date/peopleAttending/:peopleAttending', component: MapViewComponent },
      { path: 'mapview/:queryString/type/:type/date/:date/peopleAttending/:peopleAttending', component: MapViewComponent },

    ]
  },
  {
    path: 'app',
    component: AuthenticatedAppComponent,
    canActivate: [AuthGuard],
    children: [
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
      }
    ]
  },

  { path: '**', component: PageNotFoundComponent },

  //{ path: 'listview', component: ListViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }