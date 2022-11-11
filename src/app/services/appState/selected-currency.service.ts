import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';
import { SelectedDates } from 'src/app/models/selectedDates';

@Injectable({
  providedIn: 'root'
})
export class SelectedCurrencyService {

  private _selectedBaseCurrencySource = new BehaviorSubject<CurrencyMetadata>(null as any);
  private _selectedExchangeCurrencySource = new BehaviorSubject<CurrencyMetadata[]>(null as any);
  private _selectedDateRangeSource = new BehaviorSubject<SelectedDates>(null as any);

  selectedBaseCurrency$ = this._selectedBaseCurrencySource.asObservable();
  selectedExchangeCurrency$ = this._selectedExchangeCurrencySource.asObservable();
  selectedDateRange$ = this._selectedDateRangeSource.asObservable();

  constructor() { }

  setSelectedCurrencies(selectedBaseCurrency: CurrencyMetadata, 
                        selectedExchangeCurrency: CurrencyMetadata[], 
                        selectedDateRange: SelectedDates) 
  {
    this._selectedBaseCurrencySource.next(selectedBaseCurrency);
    this._selectedExchangeCurrencySource.next(selectedExchangeCurrency);
    this._selectedDateRangeSource.next(selectedDateRange);
  }
}
