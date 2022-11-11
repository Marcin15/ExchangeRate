import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarVisibilityService {

  private isNavbarShown: boolean = false;
  private isNavbarVisibleSource = new BehaviorSubject<boolean>(this.isNavbarShown);
  isNavbarVisible$: Observable<boolean> = this.isNavbarVisibleSource.asObservable();
  
  changeVisibility() {
    this.isNavbarShown = !this.isNavbarShown;

    this.isNavbarVisibleSource.next(this.isNavbarShown);
  }
}
