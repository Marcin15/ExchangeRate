import { Injectable } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ChartThemeService } from '../../chart-theme.service';
import { TimeSeriesHeaderChartDataService } from './time-series-header-chart-data.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesHeaderChartSetupService {

  private _chartData: number[] = this.chartDataService.getData();

  constructor(
    private chartDataService: TimeSeriesHeaderChartDataService,
    private chartThemeService: ChartThemeService
    ) { }

  getChartData(): ChartData {
    return {
      datasets: [
        {
          data: this._chartData,
          fill: true,
          backgroundColor: 'rgba(242, 24, 98, 0.4)',
          borderColor: 'rgb(242, 24, 98)',
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          tension: 1,
          borderWidth: 5,
          pointStyle: 'dash'
        }
      ],
      labels: this.chartDataService.getLabels(this._chartData.length),
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
          max: this._chartData.length,
          ticks: {
            display: false
          },
          grid: {
            color: initChartGridColor
          }
        },
  
        y: {
          ticks: {
            display: false
          },
          grid: {
            color: initChartGridColor
          }
        }
      },
      plugins: {
        legend: {
            display: false 
        },
        tooltip: {
          enabled: false
        },
      },
      interaction: {
        intersect: false
      },
      animations: {
        backgroundColor: {
          type: 'color',
          duration: 2000,
          easing: 'easeInBack',
          from: 'rgba(242, 24, 98, 0)',
          to: 'rgba(242, 24, 98, 0.4)',
          delay: 2600
        }
      }
    }
  }

  getChartType(): ChartType {
    return 'line';
  }
}
