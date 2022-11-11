import { Injectable } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesChartService {

  constructor() { }

  getChartType(): ChartType {
    return 'line';
  }

  getChartOptions(currencyName: string, currencyISOSymbol: string): ChartOptions {
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
          display: true,
          text: currencyName,
          font: {
            size: 14
          }
        },
         subtitle: {
          display: true,
          text: currencyISOSymbol,
          padding: {
            bottom: 10
          },
          font: {
            size: 13,
            weight: 'normal',
          },
          color: '#777'
         },
         tooltip: {
          intersect: false,
          mode: 'index',
          bodyAlign: 'center',
          displayColors: false,
          yAlign: 'top'
         },
      }
    }
  }

  getChartData(data: number[], labels: unknown[] | undefined): ChartData {
    return {
      datasets: [
        {
          data: data,  
          borderColor: 'rgba(255, 99, 132, 1)',
          fill: true,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          tension: 0,
          borderWidth: 3,
        }
      ],
      labels: labels,
    }
  }
}
