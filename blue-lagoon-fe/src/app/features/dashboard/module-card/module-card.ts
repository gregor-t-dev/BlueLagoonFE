import { Component, input } from '@angular/core';
import { Module } from './module';

import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-module-card',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatIconModule, MatRipple],
  templateUrl: './module-card.html',
  styleUrl: './module-card.scss',
})
export class ModuleCard {
  readonly module = input.required<Module>();
}
