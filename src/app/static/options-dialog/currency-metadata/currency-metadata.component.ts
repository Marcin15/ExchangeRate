import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyMetadata } from 'src/app/models/currencyMetadata';
import { fadeOutCurrencyMetadataElement } from 'src/app/others/app.animations';
import { ThemeService } from 'src/app/services/appState/theme.service';

@Component({
  selector: 'app-currency-metadata',
  templateUrl: './currency-metadata.component.html',
  styleUrls: ['./currency-metadata.component.scss'],
  animations: [
    fadeOutCurrencyMetadataElement
  ]
})

export class CurrencyMetadataComponent implements OnInit{

  @Input() currencyMetadata!: CurrencyMetadata;
  @Output() clickEvent = new EventEmitter<CurrencyMetadata>();
  
  isDarkTheme!: Observable<boolean>;

  constructor(
    private darkThemeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.isDarkTheme =  this.darkThemeService.isDarkTheme$;
  }

  onClick() {
    this.currencyMetadata.isSelected = !this.currencyMetadata.isSelected;    
    
    this.clickEvent.emit(this.currencyMetadata);
  }
}
