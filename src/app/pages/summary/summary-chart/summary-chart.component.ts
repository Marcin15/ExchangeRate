import { AfterViewInit, Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { TimeSeriesDto } from 'src/app/models/dtos/timeSeriesDto';
import { SummaryChartService } from 'src/app/services/pages/summary/summary-chart.service';

@Component({
  selector: 'app-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.scss']
})
export class SummaryChartComponent implements OnInit, OnChanges {

  @Input() inputData!: TimeSeriesDto[];

  chartData!: ChartData;
  chartOptions!: ChartOptions;
  chartType!: ChartType;

  constructor(
    private chartService: SummaryChartService
  ) { }

  ngOnInit(): void {  

    this.startupChart();
  }

  ngOnChanges(): void {
    
    this.chartData = this.chartService.getChartData(this.inputData);
  }


  startupChart() {
    this.chartOptions = this.chartService.getChartOptions();
    this.chartType = this.chartService.getChartType();
  }

}
