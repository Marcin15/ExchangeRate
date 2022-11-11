import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarVisibilityService } from 'src/app/services/appState/navbar-visibility.service';
import { ThemeService } from 'src/app/services/appState/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isDarkTheme!: Observable<boolean>;
  isNavbarActive!:  Observable<boolean>;

  constructor(
    private darkThemeService: ThemeService,
    private navbarVisiblilityService: NavbarVisibilityService
  ) { }

  ngOnInit(): void {
    this.isDarkTheme = this.darkThemeService.isDarkTheme$
    this.isNavbarActive = this.navbarVisiblilityService.isNavbarVisible$;
  }

  toggleDarkTheme() {
    this.darkThemeService.toggleTheme();
  }

  showSliderMenu() {
    this.navbarVisiblilityService.changeVisibility();
  }
}
