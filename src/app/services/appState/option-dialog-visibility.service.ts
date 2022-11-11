import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionDialogVisibilityService {

  private _isOptionDialogVisible = false;
  private _isOptionDialogVisibleSource = new BehaviorSubject<boolean>(this._isOptionDialogVisible);
  isOptionDialogVisible$ = this._isOptionDialogVisibleSource.asObservable();

  constructor() {}

  changeOptionsVisibility() {
    this._isOptionDialogVisible = !this._isOptionDialogVisible;
    this._isOptionDialogVisibleSource.next(this._isOptionDialogVisible);
  }
}
