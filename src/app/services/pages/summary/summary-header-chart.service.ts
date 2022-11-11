import { Injectable } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartThemeService } from '../../chart-theme.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryHeaderChartService {

  constructor(
    private chartThemeService: ChartThemeService
  ) { }

  getChartType(): ChartType {
    return 'line';
  }

  getChartData(): ChartData {
    return {
      datasets: [
        {
          data: [.5, 2.2, 1.6, 2, 3.5, 3.7, 4.5, 7],  
          fill: true,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          tension: 0,
          borderWidth: 3,
        },
        {
          data: [2.5, 3.1, 3.4, 2.9, 2.7, 2.9, 3, 3.1],  
          fill: true,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          tension: 0,
          borderWidth: 3,
        },
        {
          data: [3.5, 3.3, 3.1, 2.7, 1.8, 2, 1.8, 1.1],  
          fill: true,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          tension: 0,
          borderWidth: 3,
        }
      ],
      labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    }
  }

  getChartOptions(): ChartOptions {
    const initChartGridColor = this.chartThemeService.getChartGridColor();

    return {
      maintainAspectRatio: false,
      resizeDelay: 100,
      events: [],
      scales: {
        x: {
          type: 'linear',
          max: 7,
          ticks: {
            display: false
          },
          grid: {
            color: initChartGridColor
          }
        },
  
        y: {
          beginAtZero: true,
          ticks: {
            display: false,
          },
          grid: {
            color: initChartGridColor
          }
        }
      },
      elements: {
        line: {
          tension: 0, 
        },
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      animation: {
        delay(ctx, options) {
          let delay = 0;
          if (ctx.type === 'data' && ctx.mode === 'default') {
            delay = ctx.dataIndex * 120 + ctx.datasetIndex * 500;
          }
          return delay;
        },
      }
    }
  }
}
