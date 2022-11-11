import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';
import { LatestDto } from 'src/app/models/dtos/latestDto';
import { environment } from 'src/environments/environment';
import { ExchangeCurrenciesToStringConverterService } from '../converters/exchange-currencies-to-string-converter.service';

@Injectable({
  providedIn: 'root'
})
export class LatestDataService {

  private _baseUrl: string = environment.baseUrl + 'latest?';

  constructor(
    private httpClient: HttpClient,
    private exchangeCurrenciesConverter: ExchangeCurrenciesToStringConverterService
  ) { }

  getLatestData(baseCurrency: CurrencyMetadata, exchangeCurrenies: CurrencyMetadata[]): Observable<LatestDto[]> {
    const baseSymbol = baseCurrency.currencyISOCode;
    const exchangeSymbols = this.exchangeCurrenciesConverter.convert(exchangeCurrenies);    

    return this.httpClient.get<any>(this._baseUrl + `baseSymbol=${baseSymbol}&${exchangeSymbols}`).pipe(
      map(response => response.exchangeCurrency),
      map(response => this.mapResponse(response)),
      catchError((err : HttpErrorResponse) => throwError(() => err)
      )
    )
  }

  private mapResponse(response: any[]) {
    const modelArray = this.initializeModelArray(response);

    modelArray.forEach(model => {
      let dates: Date[] = [];
      let ratesValue: number[] = [];

      response.forEach(element => {
        if(model.ISOCode !== element.symbol) return;

        let last7DaysChangeMap = new Map<string, number>(Object.entries(element.last7DaysChange));
        dates = Array.from(last7DaysChangeMap.keys()).map(x => new Date(x));
        ratesValue = Array<number>.from(last7DaysChangeMap.values());
      });

      model.dates = dates;
      model.latest7DaysRateValues = ratesValue;
    });
    
    return modelArray;
  }

  private initializeModelArray(response: any[]): LatestDto[] {
    let modelArray: LatestDto[] = []; 
    response.forEach(element => {
      modelArray.push({
        name: element.name,
        ISOCode: element.symbol,
        latestRate: element.latestRate,
        rateChange: element.rateChange,
        dates: [],
        latest7DaysRateValues: []
      })
    });

    return modelArray;
  }
}
