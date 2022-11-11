import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, from, map, Observable, throwError, toArray } from 'rxjs';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';
import { InitialSelectedCurrenciesDto } from 'src/app/models/dtos/initialSelectedCurrenciesDto';
import { environment } from 'src/environments/environment';
import { SupportedCurrenciesDto } from 'src/app/models/dtos/supportedCurrenciesDto';

@Injectable({
  providedIn: 'root'
})
export class InitialDataService {

  private _baseUrl: string = environment.baseUrl + "initial-data";

  constructor(
    private httpClient: HttpClient
  ) { }

  GetCurrencyMetadata(): Observable<SupportedCurrenciesDto[]> {
    return this.httpClient
      .get<any>(this._baseUrl + "/supported-currencies")
      .pipe(
        map(response => response.currencies),
        map(response => new Map<string, string>(Object.entries(response))),
        concatMap(response => from(response)
          .pipe(
            map(x => {
              let result: SupportedCurrenciesDto = {
                currencyName: x[1],
                currencyISOCode: x[0]
              };

              return result;
            })
          )
        ),
        toArray(),
        catchError((err : HttpErrorResponse) => throwError(() => err))
      );
  }

  GetInitialSelectedCurrencies(): Observable<InitialSelectedCurrenciesDto> {
    return this.httpClient.get<any>(this._baseUrl + "/initial-selected-currencies")
  }
}
