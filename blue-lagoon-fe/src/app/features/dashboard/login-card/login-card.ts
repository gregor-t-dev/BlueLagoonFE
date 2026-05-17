import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login-card',
  imports: [MatCard, MatCardContent, NgOptimizedImage, MatButtonModule, MatButton],
  templateUrl: './login-card.html',
  styleUrl: './login-card.scss',
})
export class LoginCard {
  private authService = inject(AuthService);

  handleLogin() {
    console.log('Przycisk logowania kliknięty!');
    this.authService.login();
  }
}
