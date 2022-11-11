import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ThemeService } from 'src/app/services/appState/theme.service';
import { ChartThemeService } from 'src/app/services/chart-theme.service';
import { SummaryHeaderChartService } from 'src/app/services/pages/summary/summary-header-chart.service';
import { HeaderChartAxisDataService } from 'src/app/services/pages/time-series/header-chart-axis-data.service';

@Component({
  selector: 'app-summary-header',
  templateUrl: './summary-header.component.html',
  styleUrls: ['./summary-header.component.scss']
})
export class SummaryHeaderComponent implements OnInit {

  @ViewChild(BaseChartDirective) baseChart!: BaseChartDirective;

  yAxisData: number[] = this.chartAxisDataService.generateYAxisData(1.5, .75, 10);
  xAxisData: string[] = this.chartAxisDataService.generateXAxisData();

  chartData!: ChartData;
  chartOptions!: ChartOptions;
  chartType !: ChartType;

  isDarkTheme!: boolean;

  constructor(
    private themeService: ThemeService,
    private chartService: SummaryHeaderChartService,
    private chartAxisDataService: HeaderChartAxisDataService,
    private chartThemeService: ChartThemeService
  ) { }

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe(value => {
      this.isDarkTheme = value;
      this.changeChartGridColor();
    });

    this.startupChart();
  }

  startupChart() {
    this.chartData = this.chartService.getChartData();
    this.chartOptions = this.chartService.getChartOptions();
    this.chartType = this.chartService.getChartType();
  }

  private changeChartGridColor() {
    if(!this.baseChart){
      return;
    }
  
    const gridColor = this.chartThemeService.getChartGridColor();
    const scales: any = this.baseChart.chart?.options.scales;

    if(!scales) {
      return;
    }

    scales.x.grid.color = gridColor;
    scales.y.grid.color = gridColor;

    this.baseChart.chart?.update('none');
  }
}
