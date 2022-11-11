import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgChartsModule } from 'ng2-charts';

import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar'

import { AppComponent } from './app.component';
import { OptionsGearComponent } from './static/options-gear/options-gear.component';
import { OptionsDialogComponent } from './static/options-dialog/options-dialog.component';
import { CurrencyMetadataComponent } from './static/options-dialog/currency-metadata/currency-metadata.component';
import { ChartComponent } from './pages/time-series/chart/chart.component';
import { NavbarComponent } from './static/navbar/navbar.component';
import { TimeSeriesComponent } from './pages/time-series/time-series.component';
import { TimeSeriesHeaderComponent } from './pages/time-series/time-series-header/time-series-header.component';
import { LatestComponent } from './pages/latest/latest.component';
import { LatestHeaderComponent } from './pages/latest/latest-header/latest-header.component';
import { LatestTableComponent } from './pages/latest/latest-table/latest-table.component';
import { LatestTableChartComponent } from './pages/latest/latest-table/latest-table-chart/latest-table-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerDialogComponent } from './static/options-dialog/datepicker-dialog/datepicker-dialog.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { SummaryHeaderComponent } from './pages/summary/summary-header/summary-header.component';
import { GlobalErrorHandler } from './errors/global-error-handler';
import { GlobalHttpErrorHandler } from './errors/global-http-error-handler';
import { SummaryChartComponent } from './pages/summary/summary-chart/summary-chart.component';
import { FooterComponent } from './static/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionsGearComponent,
    OptionsDialogComponent,
    CurrencyMetadataComponent,
    ChartComponent,
    NavbarComponent,
    TimeSeriesComponent,
    TimeSeriesHeaderComponent,
    LatestComponent,
    LatestHeaderComponent,
    LatestTableComponent,
    LatestTableChartComponent,
    DatepickerDialogComponent,
    SummaryComponent,
    SummaryHeaderComponent,
    SummaryChartComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorHandler,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
