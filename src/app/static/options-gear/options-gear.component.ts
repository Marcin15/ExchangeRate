import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';
import { fadeInOutOptionsGear } from 'src/app/others/app.animations';
import { OptionDialogVisibilityService } from 'src/app/services/appState/option-dialog-visibility.service';
import { SelectedCurrencyService } from 'src/app/services/appState/selected-currency.service';
import { ThemeService } from 'src/app/services/appState/theme.service';

@Component({
  selector: 'app-options-gear',
  templateUrl: './options-gear.component.html',
  styleUrls: ['./options-gear.component.scss'],
  animations: [fadeInOutOptionsGear]
})
export class OptionsGearComponent implements OnInit {

  isVisible!: Observable<boolean>;
  isDarkTheme!: Observable<boolean>;
  selectedBaseCurrency$!: Observable<CurrencyMetadata>;

  constructor(
    private appState: OptionDialogVisibilityService,
    private darkThemeService: ThemeService,
    private selectedCurrencyService: SelectedCurrencyService
  ) { }

  ngOnInit(): void {
    this.isVisible = this.appState.isOptionDialogVisible$.pipe(
      map(value => !value)
    );

    this.isDarkTheme = this.darkThemeService.isDarkTheme$;
    this.selectedBaseCurrency$ = this.selectedCurrencyService.selectedBaseCurrency$;
  }

  showOptions() {
    this.appState.changeOptionsVisibility();
  }
}
