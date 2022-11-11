import { Injectable } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { DateToStringConverterService } from '../../converters/date-to-string-converter.service';

@Injectable({
  providedIn: 'root'
})
export class LatestHeaderChartService {

  constructor(private dateConverter: DateToStringConverterService) { }

  getData(data: number[], labels: Date[]): ChartData {
    return {
      datasets: [
        {
          data: data,  
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: true,
        }
      ],
      labels: labels.map(x => this.dateConverter.convertWithoutYear(x, '.'))
    }
  }

  getOptions(): ChartOptions {
    return {
      scales: {
        y: {
          beginAtZero: true,
        }
      },
      elements: {
        line: {
          tension: 0, 
        },
      },
      plugins: {
        legend: { display: false },
        title: { 
          display: false
         },
         tooltip: {
          intersect: false,
          mode: 'index',
          bodyAlign: 'center',
          displayColors: false,
          yAlign: 'top'
         },
      }
    };
  }


  getType(): ChartType {
    return 'line';
  }

}
