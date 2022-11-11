import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatepickerDialogVisibilityService {

  private isDatepickerDialogVisible = false;
  private isDatepickerDialogVisibleSource = new BehaviorSubject<boolean>(this.isDatepickerDialogVisible);
  isDatepickerDialogVisible$ = this.isDatepickerDialogVisibleSource.asObservable();

  constructor() { }

  changeDatepickerDialogVisibility() {
    this.isDatepickerDialogVisible = !this.isDatepickerDialogVisible;
    this.isDatepickerDialogVisibleSource.next(this.isDatepickerDialogVisible);
  }
}
