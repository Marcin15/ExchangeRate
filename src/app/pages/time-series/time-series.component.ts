import { Component, HostListener, OnInit } from '@angular/core';
import { bindCallback, combineLatest, finalize, forkJoin, merge, Observable, of, zip } from 'rxjs';
import { TimeSeriesDto } from 'src/app/models/dtos/timeSeriesDto';
import { SelectedCurrencyService } from 'src/app/services/appState/selected-currency.service';
import { TimeSeriesDataService } from 'src/app/services/http/time-series-data.service';

@Component({
  selector: 'app-time-series',
  templateUrl: './time-series.component.html',
  styleUrls: ['./time-series.component.scss']
})
export class TimeSeriesComponent implements OnInit {

  timeSeriesResponse!: TimeSeriesDto[];
  isFinalized = false;

  constructor(
    private selectedCurrencyService: SelectedCurrencyService,
    private timeSeriesData: TimeSeriesDataService) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {

    zip(
      this.selectedCurrencyService.selectedBaseCurrency$,
      this.selectedCurrencyService.selectedExchangeCurrency$,
      this.selectedCurrencyService.selectedDateRange$
    ).subscribe(value => {

      if(Object.values(value).some(prop => prop === null))
        return;

      this.timeSeriesData
        .getTimeSeriesData(value[0], value[1], value[2])
        .subscribe( value => {
          this.timeSeriesResponse = value;
          this.isFinalized = true;
        });
    });
  }
}
