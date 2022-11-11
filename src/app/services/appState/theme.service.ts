import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _isDarkTheme: boolean = this.detectUserSystemTheme();
  private _isDarkThemeSource: BehaviorSubject<boolean> = new BehaviorSubject(this._isDarkTheme);
  isDarkTheme$: Observable<boolean> = this._isDarkThemeSource.asObservable();

  constructor() {}

  toggleTheme() {
    this._isDarkTheme = !this._isDarkTheme;
    this._isDarkThemeSource.next(this._isDarkTheme);
  }

  private detectUserSystemTheme(): boolean {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }

    return false;
  }
}
