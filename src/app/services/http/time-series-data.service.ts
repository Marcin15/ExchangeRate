import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, debounce, debounceTime, delay, from, map, Observable, tap, throwError } from 'rxjs';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';
import { SelectedDates } from 'src/app/models/selectedDates';
import { TimeSeriesDto } from 'src/app/models/dtos/timeSeriesDto';
import { environment } from 'src/environments/environment';
import { DateToStringConverterService } from '../converters/date-to-string-converter.service';
import { ExchangeCurrenciesToStringConverterService } from '../converters/exchange-currencies-to-string-converter.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesDataService {

  private _baseUrl: string = environment.baseUrl + "time-series?"

  constructor(
    private httpClient: HttpClient,
    private exchangeCurrenciesToStringConverter: ExchangeCurrenciesToStringConverterService,
    private dateToStringConverter: DateToStringConverterService
    ) { }

  getTimeSeriesData(
      baseCurrency: CurrencyMetadata, 
      exchangeCurrencies: CurrencyMetadata[], 
      selectedDates: SelectedDates): Observable<TimeSeriesDto[]> {

    const baseSymbol: string = baseCurrency.currencyISOCode;
    const exchangeSymbols: string = this.exchangeCurrenciesToStringConverter.convert(exchangeCurrencies);
    const dateFromShort = this.dateToStringConverter.convert(selectedDates.DateFrom, '-');
    const dateToShort = this.dateToStringConverter.convert(selectedDates.DateTo, '-');    

    return this.httpClient
      .get<any>(`${this._baseUrl}baseSymbol=${baseSymbol}&${exchangeSymbols}&DateFrom=${dateFromShort}&DateTo=${dateToShort}`)
      .pipe(
        map(response => this.mapResponse(response)),
        catchError((err : HttpErrorResponse) => throwError(() => err))
      )
  }

  private mapResponse(response: any) {
    let exchangeSymbolsObj = new Map<string, string>(Object.entries(response.exchangeSymbols));
    let ratesObj = new Map<string, object>(Object.entries(response.rates));

    let initializedModelArray: TimeSeriesDto[] = this.initializeModelArray(exchangeSymbolsObj);
    
    return this.mapRatesResponse(ratesObj, initializedModelArray);
  }

  private mapRatesResponse(ratesObj: Map<string, object>, initializedModelArray: TimeSeriesDto[]): TimeSeriesDto[] {
    const dates = Array.from(ratesObj.keys());

    initializedModelArray.forEach(model => {
      let ratesValue: number[] = [];
      for (let i = 0; i < ratesObj.size; i++) {
        let date = dates[i];
        let obj = ratesObj.get(date) as object;
        let mappedObj = new Map<string, number>(Object.entries(obj));        
        ratesValue.push(mappedObj.get(model.ISOCode) as number);
      }
      model.dates = dates.map(date => new Date(date));
      model.ratesValue = [...ratesValue];

      ratesValue.length = 0;
    });

    return initializedModelArray;
  }

  private initializeModelArray(exchangeSymbolsObj: Map<string, string>): TimeSeriesDto[] {
    let modelArray: TimeSeriesDto[] = [];

    for (let i = 0; i < exchangeSymbolsObj.size; i++) {
      modelArray.push({
        ISOCode: [...exchangeSymbolsObj.keys()][i],
        name: [...exchangeSymbolsObj.values()][i],
        dates: [],
        ratesValue: []
      });
    }

    return modelArray;
  }
}