import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { ThemeService } from 'src/app/services/appState/theme.service';
import { ChartThemeService } from 'src/app/services/chart-theme.service';
import { LatestHeaderChartService } from 'src/app/services/pages/latest/latest-header-chart.service';

@Component({
  selector: 'app-latest-table-chart',
  templateUrl: './latest-table-chart.component.html',
  styleUrls: ['./latest-table-chart.component.scss']
})
export class LatestTableChartComponent implements OnInit {

  @Input() XAxisData!: Date[];
  @Input() YAxisData!: number[];

  isDarkTheme!: boolean;

  chartData!: ChartData;
  chartOptions!: ChartOptions;
  chartType!: ChartType;

  constructor(
    private chartService: LatestHeaderChartService,
    private themeService: ThemeService,
    private chartTheme: ChartThemeService
  ) { }

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe(value => {
      this.isDarkTheme = value;
    })

    this.setupChart();
  }

  setupChart(): void {
    this.chartData = this.chartService.getData(this.YAxisData, this.XAxisData);
    this.chartOptions = this.chartService.getOptions();
    this.chartType = this.chartService.getType();
  }
}
