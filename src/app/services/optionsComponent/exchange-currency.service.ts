import { Injectable } from '@angular/core';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';

@Injectable({
  providedIn: 'root'
})
export class ExchangeCurrencyService {

  constructor() { }

  showSelectedExchangeCurrency(currencyMetadataArray: CurrencyMetadata[], selectedExchangeCurrencyArray: CurrencyMetadata[]) {    
    currencyMetadataArray
      .filter(element => selectedExchangeCurrencyArray.includes(element))
      .map(element => element.isSelected = true);

      currencyMetadataArray
      .filter(element => !selectedExchangeCurrencyArray.includes(element))
      .map(element => element.isSelected = false);

      return currencyMetadataArray;
  }
}
