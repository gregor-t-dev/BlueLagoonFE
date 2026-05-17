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
  selector: 'app-snackbar-info',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
  ],
  templateUrl: './snackbar-info.html',
  styleUrl: './snackbar-info.scss',
  styles: `
    :host {
      display: flex;
    }
  `,
})
export class SnackbarInfo {
  message = inject<string>(MAT_SNACK_BAR_DATA);
  snackBarRef = inject(MatSnackBarRef);
}
