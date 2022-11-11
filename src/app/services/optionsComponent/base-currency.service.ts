import { Injectable } from '@angular/core';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';

@Injectable({
  providedIn: 'root'
})
export class BaseCurrencyService {

  constructor() { }

  showSelectedBaseCurrency(currencyMetadataArray: CurrencyMetadata[], selectedBaseCurrency: CurrencyMetadata) {
    if(selectedBaseCurrency ===  undefined) return;

    currencyMetadataArray
      .filter(value => value !== selectedBaseCurrency)
      .map(value => value.isSelected = false);

    currencyMetadataArray.find(value => value === selectedBaseCurrency)!.isSelected = true;  
  }
}
