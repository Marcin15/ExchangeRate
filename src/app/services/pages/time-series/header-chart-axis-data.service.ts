import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderChartAxisDataService {

  constructor() { }

  generateXAxisData(): string[] {
    const result: string[] = [];
    const daysBack = 100;
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      const newDate = date.setDate(date.getDate() - i*daysBack);
      let day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(newDate);
      let month = new Intl.DateTimeFormat('en', {month: '2-digit'}).format(newDate);
      let year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(newDate);
      
      result.unshift(`${day}-${month}-${year}`);
    }
    
    return result;
  }

  generateYAxisData(initialValue: number, step: number, count: number): number[] {
    const result: Array<number> = [];
    for (let i = 0; i < count; i++) {
      result.unshift(i * step + initialValue);      
    }
    
    return result;
  }
}
