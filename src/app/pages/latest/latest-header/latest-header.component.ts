import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/services/appState/theme.service';

@Component({
  selector: 'app-latest-header',
  templateUrl: './latest-header.component.html',
  styleUrls: ['./latest-header.component.scss']
})
export class LatestHeaderComponent implements OnInit {

  isDarkTheme!: Observable<boolean>;

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme$;
  }

}
