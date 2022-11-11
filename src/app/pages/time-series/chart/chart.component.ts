import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { TimeSeriesDto } from 'src/app/models/dtos/timeSeriesDto';
import { ThemeService } from 'src/app/services/appState/theme.service';
import { ChartThemeService } from 'src/app/services/chart-theme.service';
import { TimeSeriesChartService } from 'src/app/services/pages/time-series/time-series-chart.service';
import { DateToStringConverterService } from 'src/app/services/converters/date-to-string-converter.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @ViewChild(BaseChartDirective) baseChart!: BaseChartDirective;

  @Input() timeSeriesData!: TimeSeriesDto;

  isDarkTheme!: boolean;

  chartData!: ChartData;
  chartOptions!: ChartOptions;
  chartType!: ChartType;

  private _dates!: string[];

  constructor(
    private darkThemeService: ThemeService,
    private chartService: TimeSeriesChartService,
    private chartDarkThemeService: ChartThemeService,
    private dateFormatter: DateToStringConverterService
  ) { }

  ngOnInit(): void {
    this.darkThemeService.isDarkTheme$.subscribe(value => {
      this.isDarkTheme = value;
      this.changeChartGridColor();
    });

    this._dates = this.timeSeriesData.dates.map(x => this.dateFormatter.convert(x, '-'));
    
    this.setupChart();
  }

  setupChart() {
    this.chartData = this.chartService.getChartData(this.timeSeriesData.ratesValue, this._dates);
    this.chartOptions = this.chartService.getChartOptions(this.timeSeriesData.name, this.timeSeriesData.ISOCode);
    this.chartType = this.chartService.getChartType();
  }

  ngAfterViewInit(): void {
    this.createGradient();
    this.changeChartGridColor();
  }
  
  createGradient() {
    const ctx = <CanvasRenderingContext2D><unknown>this.baseChart.ctx;

    const bottom = <number>this.baseChart?.chart?.chartArea.bottom;
    const top = <number>this.baseChart?.chart?.chartArea.top;

    const gradient = ctx!.createLinearGradient(0, bottom, 0, top);
    // gradient.addColorStop(0, 'rgba(225, 99, 132, 0.7)');
    // gradient.addColorStop(1, 'rgba(255, 153, 125, 0.7)');
    gradient.addColorStop(0, 'rgba(242, 24, 98, 0.7)');
    gradient.addColorStop(1, 'rgba(241,181,35,0.7)');

    this.chartData.datasets[0].backgroundColor = gradient;

    this.baseChart?.update();
  }

  private changeChartGridColor() {   
    if(!this.baseChart){
      return;
    }
    const gridColor = this.chartDarkThemeService.getChartGridColor();
    const tickColor = this.chartDarkThemeService.getTickColor();

    const scales: any = this.baseChart.chart?.options.scales;
    const plugins: any = this.baseChart.chart?.options.plugins;

    if(!scales) {
      return;
    }

    scales.x.grid.color = gridColor;
    scales.y.grid.color = gridColor;

    scales.x.ticks.color = tickColor;
    scales.y.ticks.color = tickColor;

    plugins.title.color = tickColor;

    this.baseChart.chart?.update('none');
  }
}
