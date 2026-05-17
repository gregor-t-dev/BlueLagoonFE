import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-error',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
  templateUrl: './snackbar-error.html',
  styleUrl: './snackbar-error.scss',
  styles: `
    :host {
      display: flex;
    }
  `,
})
export class SnackbarError {
  message = inject<string>(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef);
}
