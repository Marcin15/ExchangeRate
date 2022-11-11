import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ThemeService } from 'src/app/services/appState/theme.service';
import { ChartThemeService } from 'src/app/services/chart-theme.service';
import { HeaderChartAxisDataService as HeaderChartAxisDataService } from 'src/app/services/pages/time-series/header-chart-axis-data.service';
import { TimeSeriesHeaderChartAnimationService } from 'src/app/services/pages/time-series/time-series-header-chart-animation.service';
import { TimeSeriesHeaderChartDataService } from 'src/app/services/pages/time-series/time-series-header-chart-data.service';
import { TimeSeriesHeaderChartSetupService } from 'src/app/services/pages/time-series/time-series-header-chart-setup.service';

@Component({
  selector: 'app-time-series-header',
  templateUrl: './time-series-header.component.html',
  styleUrls: ['./time-series-header.component.scss']
})
export class TimeSeriesHeaderComponent implements OnInit {

  @ViewChild(BaseChartDirective) baseChart!: BaseChartDirective;

  isDarkTheme!: boolean;
  yAxisData: number[] = this.chartAxisDataService.generateYAxisData(2, .15, 8);
  xAxisData: string[] = this.chartAxisDataService.generateXAxisData();

  chartData!: ChartData;
  chartOptions!: ChartOptions;
  chartType !: ChartType;

  private _chartData: number[] = this.chartDataService.getData();
  
  constructor(
    private themeService: ThemeService,
    private timeSeriesHeaderService: TimeSeriesHeaderChartSetupService,
    private chartDataService: TimeSeriesHeaderChartDataService,
    private chartThemeService: ChartThemeService,
    private chartAnimationsService: TimeSeriesHeaderChartAnimationService,
    private chartAxisDataService: HeaderChartAxisDataService
    ) { }
    
  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe((value) => {
      this.isDarkTheme = value;
      this.changeChartGridColor();
    });

    this.setupChart();
    this.chartAnimation();
  }

  private setupChart(): void { 
    this.chartData = this.timeSeriesHeaderService.getChartData();
    this.chartOptions = this.timeSeriesHeaderService.getChartOptions();
    this.chartType = this.timeSeriesHeaderService.getChartType();
  }

  private chartAnimation() {
    this.chartOptions.animations = this.chartAnimationsService.chartAnimation(this.chartOptions, this._chartData.length);
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
