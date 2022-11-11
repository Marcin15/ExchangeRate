import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FrontChartDataService {

  constructor() { }

  private _dataRange: number[] = [];

  getData() {
    
    const dataRange0_10 = new Array(1001).fill(0).map((_, i) => i * 0.01);
    const dataRange10_20 = new Array(1001).fill(0).map((_, i) => i * 0.01 + 10);
    const dataRange20_13 = new Array(701).fill(0).map((_, i) => i * 0.01 + 13).sort((a, b) => b - a);
    const dataRange13_22 = new Array(901).fill(0).map((_, i) => i * 0.01 + 13);
    const dataRange22_17 = new Array(501).fill(0).map((_, i) => i * 0.01 + 17).sort((a, b) => b - a);
    const dataRange17_21 = new Array(401).fill(0).map((_, i) => i * 0.01 + 17);
    const dataRange21_35 = new Array(1401).fill(0).map((_, i) => i * 0.01 + 21);

    this._dataRange =  [...dataRange0_10, 
            ...dataRange10_20, 
            ...dataRange20_13, 
            ...dataRange13_22, 
            ...dataRange22_17,
            ...dataRange17_21,
            ...dataRange21_35];

    return this._dataRange;
  }

  getLabels() {
    return new Array(this._dataRange.length).fill(0).map((_, i) => i + 1);
  }
}
