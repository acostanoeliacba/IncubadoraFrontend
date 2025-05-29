
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  showError(message: string): Observable<void> {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '500px'
    });

    return dialogRef.afterClosed();
  }


  showSuccess(message: string): Observable<void> {
    return this.dialog.open(SuccessDialogComponent, {
      data: { message },
      width: '500px'
    }).afterClosed();
  }
}
