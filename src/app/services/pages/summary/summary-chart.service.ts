import { Injectable } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TimeSeriesDto } from 'src/app/models/dtos/timeSeriesDto';
import { ChartThemeService } from '../../chart-theme.service';
import { DateToStringConverterService } from '../../converters/date-to-string-converter.service';

@Injectable({
  providedIn: 'root'
})
export class SummaryChartService {

  constructor(
    private chartThemeService: ChartThemeService,
    private dateFormatter: DateToStringConverterService
  ) { }

  getChartType(): ChartType {
    return 'line';
  }

  getChartData(data: TimeSeriesDto[]): ChartData {
    let datasets: ChartDataset[] = [];
    let labels: string[] = data[0].dates.map(x => this.dateFormatter.convert(x, '-'));
    
    data.forEach(x => {
      datasets.push({
        data: x.ratesValue,
        label: x.ISOCode,
        fill: false,
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        tension: 0,
        borderWidth: 3,
      });
    });    

    return {
      datasets: datasets,
      labels: labels
    }
  }

  getChartOptions(): ChartOptions {
    const initChartGridColor = this.chartThemeService.getChartGridColor();

    return {
      maintainAspectRatio: false,
      resizeDelay: 100,
      scales: {
        x: {
          grid: {
            color: initChartGridColor
          }
        },
  
        y: {
          beginAtZero: true,
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
        tooltip: {
          intersect: false,
          mode: 'nearest',
          titleAlign: 'center',
          bodyAlign: 'left',
          yAlign: 'top', 
          position: 'nearest',
          multiKeyBackground: '#fff'
        }
      }
    }
  }
}
