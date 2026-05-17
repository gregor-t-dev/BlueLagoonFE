import { EventType } from 'angular-oauth2-oidc';
import { AuthService } from './../../core/services/auth.service';
import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from '../../shared/components/header/header';
import { MatButtonModule } from '@angular/material/button';
import { Module } from './module-card/module';
import { ModuleCard } from './module-card/module-card';
import { LoginCard } from './login-card/login-card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarError } from '../../shared/components/snackbar-error/snackbar-error';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarInfo } from '../../shared/components/snackbar-info/snackbar-info';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, Header, MatButtonModule, ModuleCard, LoginCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly authService = inject(AuthService);
  readonly isAuthenticated = this.authService.isAuthenticated;
  private readonly authEvent$ = this.authService.authEvent$;
  private readonly destroyRef = inject(DestroyRef);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.authEvent$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event.error) {
        this.displayErrorSnackBar(event.error);
      } else if (event.eventType === 'session_terminated') {
        this.displayInfoSnackBar('Sesja została zakończona i nastąpiło wylogowanie');
      }
    });

    this.displayInfoSnackBar(
      'Test test test test test test test test test test tsettse test set est es test es tset set set set set est sesedfds fdsg sdg sdg dsf dsysh',
    );
  }

  private displayErrorSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarError, {
      data: message,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  private displayInfoSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarInfo, {
      data: message,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  readonly modules: Module[] = [
    {
      id: '123',
      name: 'iam',
      displayName: 'Identity Access Management',
      icon: 'admin_panel_settings',
      description: 'Zarządzanie dostępem i uprawnieniami',
    },
    {
      id: '1234',
      name: 'sales',
      displayName: 'Sales',
      icon: 'shopping_cart',
      description: 'Sprzedaż',
    },
    {
      id: '1235',
      name: 'abc',
      displayName: 'Account',
      icon: 'account_box',
      description: 'Coś innego',
    },
    {
      id: '1236',
      name: 'bca',
      displayName: 'Banking',
      icon: 'account_balance',
      description: 'Zarządzanie dostępem i uprawnieniami',
    },
  ];
}
