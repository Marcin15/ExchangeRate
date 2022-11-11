import { Injectable } from '@angular/core';
import { AnimationsSpec, ChartOptions, ChartTypeRegistry } from 'chart.js';
import { _DeepPartialObject } from 'chart.js/types/utils';

@Injectable({
  providedIn: 'root'
})
export class TimeSeriesHeaderChartAnimationService {

  constructor() { }

  chartAnimation(chartOptions: ChartOptions, chartPointsCount: number): _DeepPartialObject<AnimationsSpec<keyof ChartTypeRegistry>> {
    const progresiveLineAnimationDuration = 2000;
    const backgroundColorAnimationDuration = 2000;
    const delayBetweenPoints: number = progresiveLineAnimationDuration / chartPointsCount;    

    return chartOptions.animations = {
      x: {
        type: "number",
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN,
        delay(ctx: any) {
          if (ctx.type !== 'data' || ctx.xStarted) {
            return 0;
          }
          ctx.xStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      },
      
      y: {
        type: "number",
        easing: 'linear',
        duration: delayBetweenPoints,
        from: this.previousY,
        delay(ctx: any) {
          if (ctx.type !== 'data' || ctx.yStarted) {
            return 0;
          }
          ctx.yStarted = true;
          return ctx.index * delayBetweenPoints;
        }
      },
      
      // backgroundColor: {
      //   type: 'color',
      //   duration: backgroundColorAnimationDuration,
      //   easing: 'easeInBack',
      //   from: 'rgba(242, 24, 98, 0)',
      //   to: 'rgba(242, 24, 98, 0.4)',
      //   delay: 2600,
      // }
    }
  }

  private previousY (ctx: any) {  
    return ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) 
                           : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  }
}
