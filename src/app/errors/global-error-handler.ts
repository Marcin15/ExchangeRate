import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private snackbar: MatSnackBar) { }
  
  handleError(error: Error): void {
    this.snackbar.open(
      error.message,
      'Close',
      {
        duration: 8000
      }
    );
  }
}
