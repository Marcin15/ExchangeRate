import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LatestComponent } from './pages/latest/latest.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { TimeSeriesComponent } from './pages/time-series/time-series.component';

const routes: Routes = [
  { path: '', redirectTo: '/time-series', pathMatch: 'full' },
  { path: 'time-series', component: TimeSeriesComponent, pathMatch: 'full' },
  { path: 'latest', component: LatestComponent, pathMatch: 'full'},
  { path: 'summary', component: SummaryComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
