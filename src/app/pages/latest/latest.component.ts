import { Component, OnDestroy, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { LatestDto } from 'src/app/models/dtos/latestDto';
import { SelectedCurrencyService } from 'src/app/services/appState/selected-currency.service';
import { LatestDataService } from 'src/app/services/http/latest-data.service';

@Component({
  selector: 'app.latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {

  latestResponse!: LatestDto[];

  constructor(
    private latestData: LatestDataService,
    private selectedCurrencyService: SelectedCurrencyService) { }

  ngOnInit(): void {
    this.getData();
  }

  private getData(): void {
    zip(
      this.selectedCurrencyService.selectedBaseCurrency$,
      this.selectedCurrencyService.selectedExchangeCurrency$
    ).subscribe(response => {      

      if(Object.values(response).some(prop => prop === null))
        return;

      this.latestData
        .getLatestData(response[0], response[1])
        .subscribe(response => this.latestResponse = response);
    });
  }
}
