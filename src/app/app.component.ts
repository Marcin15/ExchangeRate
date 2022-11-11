import { Component, OnInit } from '@angular/core';
import { fadeInOutOptions } from './others/app.animations';

import { Observable } from 'rxjs';
import { ThemeService } from './services/appState/theme.service';

import * as AOS from 'aos';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { OptionDialogVisibilityService } from './services/appState/option-dialog-visibility.service';
import { DatepickerDialogVisibilityService } from './services/appState/datepicker-dialog-visibility.service';
import { NavbarVisibilityService } from './services/appState/navbar-visibility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOutOptions]
})
export class AppComponent implements OnInit{
  
  isDarkTheme!: Observable<boolean>;
  private isOptionDialogVisible: boolean = false;
  private isDatepieckerDialogVisible: boolean = false;
  private isNavbarVisible: boolean = false;

  constructor(
    private darkThemeService: ThemeService,
    private router: Router,
    private optionDialogVisibilityService: OptionDialogVisibilityService,
    private datepickerDialogVisibilityService: DatepickerDialogVisibilityService,
    private navbarVisibilityService: NavbarVisibilityService
    ) {}

  ngOnInit(): void {
    this.isDarkTheme = this.darkThemeService.isDarkTheme$;

    AOS.init({
      once: true,
      duration: 900,
      easing: 'ease-in-out-quad',
    });
    this.registerSubscriptions();

    this.onRouteChange();
  }

  private onRouteChange() {
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        if(this.isOptionDialogVisible) 
          this.optionDialogVisibilityService.changeOptionsVisibility();

        if(this.isDatepieckerDialogVisible)
          this.datepickerDialogVisibilityService.changeDatepickerDialogVisibility();

        if(this.isNavbarVisible)
          this.navbarVisibilityService.changeVisibility();
      }
    })
  }

  registerSubscriptions(): void {
    this.optionDialogVisibilityService.isOptionDialogVisible$
      .subscribe(value => this.isOptionDialogVisible = value);

    this.datepickerDialogVisibilityService.isDatepickerDialogVisible$
      .subscribe(value => this.isDatepieckerDialogVisible = value);

    this.navbarVisibilityService.isNavbarVisible$
      .subscribe(value => this.isNavbarVisible = value);
  }
} 
