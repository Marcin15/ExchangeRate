import { Injectable } from '@angular/core';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';

@Injectable({
  providedIn: 'root'
})
export class ExchangeCurrenciesToStringConverterService {

  constructor() { }

  convert(exchangeCurrencies: CurrencyMetadata[]): string {
    let result: string = "";

    exchangeCurrencies.forEach((value, index) => {      
      if(index !== exchangeCurrencies.length - 1) {
        result += `ExchangeSymbols=${value.currencyISOCode}&`;
        return;
      }
      result += `ExchangeSymbols=${value.currencyISOCode}`
    });  

    return result;
  }
}
