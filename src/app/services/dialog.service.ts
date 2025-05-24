
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  showError(message: string): Observable<void> {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '400px'
    });

    return dialogRef.afterClosed();
  }
}
