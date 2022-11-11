import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateToStringConverterService {

  constructor() { }

  convert(date: Date, separator: DateToStringConverterService.allowedSeparators): string {
    const year = date.getFullYear();
    let month = this.addZeroIfLessThan10(date.getMonth() + 1);
    let day = this.addZeroIfLessThan10(date.getDate());
    

    return `${year}${separator}${month}${separator}${day}`;
  }

  convertWithoutYear(date: Date, separator: DateToStringConverterService.allowedSeparators): string {
    let month = this.addZeroIfLessThan10(date.getMonth() + 1);
    let day = this.addZeroIfLessThan10(date.getDate());
    

    return `${day}${separator}${month}`;
  }

  private addZeroIfLessThan10(date: number): string {
    if(date < 10) {
      return "0" + date;
    }

    return date.toString();
  }
}

module DateToStringConverterService {
  export type allowedSeparators = '.' | '-' | '/'
}