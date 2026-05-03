import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Header } from '../../shared/components/header/header';
import { MatButtonModule } from '@angular/material/button';
import { Module } from './module-card/module';
import { ModuleCard } from './module-card/module-card';

@Component({
  selector: 'app-dashboard',
  imports: [MatSidenavModule, Header, MatButtonModule, ModuleCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
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
