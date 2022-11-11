import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectedRadioButton as SelectedCurrencySwitchingButton } from 'src/app/models/enums';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';
import { InitialSelectedCurrenciesDto } from "src/app/models/dtos/initialSelectedCurrenciesDto";
import { SelectedDates } from 'src/app/models/selectedDates';
import { fadeInOutOptions, fadeOutCurrencyMetadataElement } from 'src/app/others/app.animations';
import { DatepickerDialogVisibilityService } from 'src/app/services/appState/datepicker-dialog-visibility.service';
import { OptionDialogVisibilityService } from 'src/app/services/appState/option-dialog-visibility.service';
import { SelectedCurrencyService } from 'src/app/services/appState/selected-currency.service';
import { ThemeService } from 'src/app/services/appState/theme.service';
import { InitialDataService } from 'src/app/services/http/initial-data.service';
import { BaseCurrencyService } from 'src/app/services/optionsComponent/base-currency.service';
import { ExchangeCurrencyService } from 'src/app/services/optionsComponent/exchange-currency.service';
import { FilterService } from 'src/app/services/optionsComponent/filter.service';

@Component({
  selector: 'app-options',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss'],
  animations: [
    fadeInOutOptions,
    fadeOutCurrencyMetadataElement
  ]
})
export class OptionsDialogComponent implements OnInit{

  currencyMetadataArray!: CurrencyMetadata[];
  isOptionDialogVisible!: boolean;
  isDarkTheme!: Observable<boolean>;
  isDatepickerDialogVisible!: Observable<boolean>;
  isSearchResultsEmpty: boolean = false;
  selectedDates: SelectedDates = {
    DateFrom: this.calculateInitialDateFrom(),
    DateTo: new Date()
  }
  isSelectedCurrencyHasBeenChanged = false;

  private _selectedBaseCurrency!: CurrencyMetadata;
  private _selectedExchangeCurrencyArray: CurrencyMetadata[] = [];

  private _selectedCurrencySwitchingButton: SelectedCurrencySwitchingButton = SelectedCurrencySwitchingButton.BASE;

  constructor(
    private optionDialogVisibilityService: OptionDialogVisibilityService,
    private datepickerDialogVisibilityService: DatepickerDialogVisibilityService,
    private filterService: FilterService,
    private baseCurrencyButtonService: BaseCurrencyService,
    private exchangeCurrencyButtonService: ExchangeCurrencyService,
    private darkThemeService: ThemeService,
    private initialDataService: InitialDataService,
    private selectedCurrencyService: SelectedCurrencyService,
  ) { }
  
  ngOnInit(): void {
    this.registerThemeSubscription();
    this.registerOptionDialogVisibilitySubscription();
    this.registerDatepickerDialogVisiblilitySubscription();
    this.mapDtoToCurrencyMetadataModel();
    this.registerInitialDataSubscription();
  }

  registerThemeSubscription() {
    this.isDarkTheme = this.darkThemeService.isDarkTheme$;
  }

  registerOptionDialogVisibilitySubscription() {
    this.optionDialogVisibilityService.isOptionDialogVisible$.subscribe(value => {
      this.isOptionDialogVisible = value;
      this.setSelectedCurrenciesWhenNothingHasChanged(value);
    });
  }

  registerDatepickerDialogVisiblilitySubscription() {
    this.isDatepickerDialogVisible = this.datepickerDialogVisibilityService.isDatepickerDialogVisible$;
  }

  registerInitialDataSubscription() {
    this.initialDataService.GetInitialSelectedCurrencies().subscribe(response => {
      this.setInitialSelectedCurrencies(response)

      this.selectedCurrencyService
        .setSelectedCurrencies(this._selectedBaseCurrency, this._selectedExchangeCurrencyArray, this.selectedDates);
    });
  }

  mapDtoToCurrencyMetadataModel() {
    this.initialDataService.GetCurrencyMetadata().subscribe(response => {

      this.currencyMetadataArray = response.map(x => <CurrencyMetadata>{
        currencyName: x.currencyName,
        currencyISOCode: x.currencyISOCode,
        isSelected: false,
        isVisible: true
      });
    });
  }

  getSelectedDates(selectedDates: SelectedDates) {
    
    console.log();
    
    this.checkIfSelectedDatesHaveBeenChanged(selectedDates)

    this.selectedDates = selectedDates;
  }

  private checkIfSelectedDatesHaveBeenChanged(selectedDates: SelectedDates): void {
    if(JSON.stringify(this.selectedDates) !== JSON.stringify(selectedDates))
      this.isSelectedCurrencyHasBeenChanged = true;
  } 

  hideOptionsDialog(): void {
    this.optionDialogVisibilityService.changeOptionsVisibility();
    
    this._selectedCurrencySwitchingButton = SelectedCurrencySwitchingButton.BASE;
    this.baseCurrencyButtonService.showSelectedBaseCurrency(this.currencyMetadataArray, this._selectedBaseCurrency);
  }

  filterCurrencyMetadata(event: KeyboardEvent): void {

    let target = <HTMLInputElement>event.target;
    let targetValue = target.value.toLowerCase();

    this.currencyMetadataArray = [...this.filterService.filterCurrencyMetadata(this.currencyMetadataArray, targetValue)];

    this.isSearchResultsEmpty = this.isSearchResultsEmptyCheck();
  }

  isSearchResultsEmptyCheck() {
    if(this.currencyMetadataArray.filter(x => x.isVisible).length === 0) {
      return true;
    }
    return false;
  }

  clickBaseButton(event: MouseEvent) {
    this.setChecked(<HTMLDivElement>event.target);
    this._selectedCurrencySwitchingButton = SelectedCurrencySwitchingButton.BASE;
    this.baseCurrencyButtonService.showSelectedBaseCurrency(this.currencyMetadataArray, this._selectedBaseCurrency);
  }

  clickExchangeButton(event: MouseEvent): void {
    this.setChecked(<HTMLDivElement>event.target);
    this._selectedCurrencySwitchingButton = SelectedCurrencySwitchingButton.EXCHANGE;
    this.exchangeCurrencyButtonService
      .showSelectedExchangeCurrency(this.currencyMetadataArray, this._selectedExchangeCurrencyArray);
  }

  clickCurrencyMetadataComponent(element: CurrencyMetadata): void { 
    this.isSelectedCurrencyHasBeenChanged = true;

    switch(this._selectedCurrencySwitchingButton) {
      case SelectedCurrencySwitchingButton.BASE: 
        this._selectedBaseCurrency = element;
        this.baseCurrencyButtonService
          .showSelectedBaseCurrency(this.currencyMetadataArray, this._selectedBaseCurrency);
        return;

      case SelectedCurrencySwitchingButton.EXCHANGE: 
        this.updateSelectedExchangeCurrencyArray(element); 
        return;
    }
  }

  changeDatepieckerDialogVisibility() {
    this.datepickerDialogVisibilityService.changeDatepickerDialogVisibility();
  }

  private setChecked(element: HTMLDivElement): void {
    let nodeArray = element.getElementsByTagName('input')[0];
    nodeArray.checked = true;
  }

  private updateSelectedExchangeCurrencyArray(element: CurrencyMetadata): void {    
    if(element.isSelected) {
      this._selectedExchangeCurrencyArray.push(element);
      return;
    } 

    this._selectedExchangeCurrencyArray.splice(this._selectedExchangeCurrencyArray.indexOf(element), 1);
  }

  private calculateInitialDateFrom(): Date {
    const today = new Date();
    const todayNumberReprezentation = today.setDate(today.getDate());
    const daysPast = 7;

    return new Date(todayNumberReprezentation - daysPast * 1000 * 60 * 60 * 24);
  }

  private setInitialSelectedCurrencies(initData: InitialSelectedCurrenciesDto) {
    this._selectedBaseCurrency = this.currencyMetadataArray
      .find(x => x.currencyISOCode === initData.selectedBase) as CurrencyMetadata;  
    
    this._selectedExchangeCurrencyArray = this.currencyMetadataArray
      .filter(x => initData.selectedExchange.includes(x.currencyISOCode)); 
    
    this.baseCurrencyButtonService
      .showSelectedBaseCurrency(this.currencyMetadataArray, this._selectedBaseCurrency);
  }

  private setSelectedCurrenciesWhenNothingHasChanged(isOptionDialogVisible: boolean) {
    if(!isOptionDialogVisible && this.isSelectedCurrencyHasBeenChanged) {
      this.selectedCurrencyService
       .setSelectedCurrencies(this._selectedBaseCurrency, this._selectedExchangeCurrencyArray, this.selectedDates);
    }

    this.isSelectedCurrencyHasBeenChanged = false;
  }
}
