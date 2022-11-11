import { AfterViewChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SelectedDates } from 'src/app/models/selectedDates';
import { ThemeService } from 'src/app/services/appState/theme.service';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Moment } from 'moment';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-datepicker-dialog',
  templateUrl: './datepicker-dialog.component.html',
  styleUrls: ['./datepicker-dialog.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DatepickerDialogComponent implements OnInit, AfterViewChecked, OnDestroy {

  @Input() initialDatesValues!: SelectedDates;
  @Output() selectedDates = new EventEmitter<SelectedDates>();

  matCalendar!: Element;
  isDarkTheme!: boolean;

  minDate = new Date(2000, 0, 1)
  today = new Date();

  dateFromHandler = new FormControl({} as Moment);
  dateToHandler = new FormControl({} as Moment);

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe(value => {
      this.isDarkTheme = value;
    });

    this.dateFromHandler.setValue(moment(this.initialDatesValues.DateFrom));
    this.dateToHandler.setValue(moment(this.initialDatesValues.DateTo));
  }

  ngAfterViewChecked(): void {
    this.matCalendar = document.querySelector('.mat-calendar') as Element;

    if(this.isDarkTheme && this.matCalendar !== null) {
      this.matCalendar.classList.add('mat-calendar-dark-theme');
    }
  }

  ngOnDestroy(): void {
    this.selectedDates.emit({
      DateFrom: this.dateFromHandler.value?.toDate() as Date,
      DateTo: this.dateToHandler.value?.toDate() as Date
    });
  }

  datepickerFromDateChange() {
    const dateProvider = this.dateFromHandler.value!;
    const dateFromInTheNextYear = this.getDateBasedOnTheGivenYearDifference(dateProvider, 1);   

    if(this.dateToHandler.value! > dateFromInTheNextYear)
      this.dateToHandler.setValue(dateFromInTheNextYear);
  }

  datepickerToDateChange() {
    const dateProvider = this.dateToHandler.value!;
    const dateToInThePastYear = this.getDateBasedOnTheGivenYearDifference(dateProvider, -1);

    if(this.dateFromHandler.value! < dateToInThePastYear)
      this.dateFromHandler.setValue(dateToInThePastYear);
  }

  private getDateBasedOnTheGivenYearDifference(dateProvider: Moment, yearDifference: number): Moment {    

    const dateFromYear = dateProvider.year();
    const dateFromMonth = dateProvider.month();
    const dateFromDay = dateProvider.date();

    return moment(new Date( dateFromYear + yearDifference, dateFromMonth, dateFromDay));
  }
}
