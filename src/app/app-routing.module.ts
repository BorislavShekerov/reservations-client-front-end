import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './components/list-view/list-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/listview', pathMatch: 'full' },
  { path: 'listview/:queryString', component: ListViewComponent },

  { path: 'listview/type/:type', component: ListViewComponent },
  { path: 'listview/:queryString/type/:type', component: ListViewComponent },

  { path: 'listview/date/:date', component: ListViewComponent },
  { path: 'listview/:queryString/date/:date', component: ListViewComponent },
  { path: 'listview/type/:type/date/:date', component: ListViewComponent },
  { path: 'listview/:queryString/type/:type/date/:date', component: ListViewComponent },

  { path: 'listview/peopleGoing/:peopleGoing', component: ListViewComponent },
  { path: 'listview/:queryString/peopleGoing/:peopleGoing', component: ListViewComponent },
  { path: 'listview/type/:type/peopleGoing/:peopleGoing', component: ListViewComponent },
  { path: 'listview/:queryString/type/:type/peopleGoing/:peopleGoing', component: ListViewComponent },
  { path: 'listview/date/:date/peopleGoing/:peopleGoing', component: ListViewComponent },
  { path: 'listview/:queryString/date/:date/peopleGoing/:peopleGoing', component: ListViewComponent },
  { path: 'listview/type/:type/date/:date/peopleGoing/:peopleGoing', component: ListViewComponent },
  { path: 'listview/:queryString/type/:type/date/:date/peopleGoing/:peopleGoing', component: ListViewComponent },

  { path: 'listview', component: ListViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }