import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent }   from './components/list-view/list-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/listview', pathMatch: 'full' },
  { path: 'listview/:queryString',  component: ListViewComponent },
  { path: 'listview',  component: ListViewComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}