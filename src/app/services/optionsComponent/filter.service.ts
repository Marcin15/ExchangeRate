import { Injectable } from '@angular/core';
import { CurrencyMetadata } from '../../models/currencyMetadata';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterCurrencyMetadata( inputArray: CurrencyMetadata[], inputText: string): CurrencyMetadata[] {
              
    inputArray.map(value => {
      const isShearched = value.currencyName.toLowerCase().includes(inputText) ||
                          value.currencyISOCode.toLowerCase().includes(inputText);

      value.isVisible = isShearched;
    });

    return inputArray;
  }
}
