import { Component, HostListener, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { TimeSeriesDto } from 'src/app/models/dtos/timeSeriesDto';
import { SelectedCurrencyService } from 'src/app/services/appState/selected-currency.service';
import { TimeSeriesDataService } from 'src/app/services/http/time-series-data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  httpResponse!: TimeSeriesDto[];
  isFinalized = false;

  constructor(
    private timeSeriesDataService: TimeSeriesDataService,
    private selectedCurrencyDataService: SelectedCurrencyService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {

    zip(
      this.selectedCurrencyDataService.selectedBaseCurrency$,
      this.selectedCurrencyDataService.selectedExchangeCurrency$,
      this.selectedCurrencyDataService.selectedDateRange$
    ).subscribe(value => {

      if(Object.values(value).some(prop => prop === null))
        return;

      this.timeSeriesDataService
        .getTimeSeriesData(value[0], value[1], value[2])
        .subscribe( value => {
          this.httpResponse = value;
          this.isFinalized = true;
        });
    });
  }
}