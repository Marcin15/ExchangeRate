import { Injectable } from '@angular/core';
import { ThemeService } from './appState/theme.service';

@Injectable({
  providedIn: 'root'
})
export class ChartThemeService {

  private _gridColorLightTheme = 'rgba(231, 231, 231, 1)';
  private _gridColorDarkTheme = 'rgba(255, 255, 255, 0.2)';

  private _tickColorLightTheme = 'rgba(120, 120, 120, 1)';
  private _tickColorDarkTheme = 'rgba(255, 255, 255, 0.5)';

  isDarkTheme!: boolean;

  constructor(
    private themeService: ThemeService
  ) {
    themeService.isDarkTheme$.subscribe(value => this.isDarkTheme = value);
   }

  getChartGridColor(): string {
    return this.isDarkTheme ? this._gridColorDarkTheme : this._gridColorLightTheme;
  }

  getTickColor(): string {
    return this.isDarkTheme ? this._tickColorDarkTheme : this._tickColorLightTheme;
  }
}
