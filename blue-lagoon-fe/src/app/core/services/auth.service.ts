import { Injectable, inject, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from '../auth-config';
import { Router } from '@angular/router';
import { AuthEvent } from './auth-event';
import { firstValueFrom, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { API_ENDPOINTS } from '../api-endpoints';

type SessionStatus = {
  isAuthenticated: true | false;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private oauthService = inject(OAuthService);
  readonly isAuthenticated = signal<boolean>(false);
  private readonly authEventSource = new Subject<AuthEvent>();
  readonly authEvent$ = this.authEventSource.asObservable();
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    this.oauthService.configure(authCodeFlowConfig);
    //this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.events.subscribe((event) => {
      switch (event.type) {
        case 'token_received':
          this.isAuthenticated.set(true);
          console.log('Otrzymano access token: ', this.oauthService.getAccessToken());
          break;
        case 'logout':
          this.isAuthenticated.set(false);
          break;
        case 'token_error':
        case 'token_refresh_error':
        case 'silent_refresh_error':
          console.warn('Błąd autoryzacji - czyszczenie sesji');
          this.isAuthenticated.set(false);
          this.authEventSource.next({
            eventType: event.type,
            error: 'Błąd autoryzacji - czyszczenie sesji',
          });
          this.logout();
          break;
        case 'session_terminated':
          this.authEventSource.next({
            eventType: event.type,
          });
          this.logout();
          break;
        default:
          console.log('Wystąpił event Oauth: ', event.type, event);
      }
    });
  }

  public async runLoginSequence() {
    await this.oauthService
      .loadDiscoveryDocumentAndTryLogin()
      .then(async () => {
        console.log('AuthService: dokument discovery pobrany');

        if (this.hasValidToken) {
          console.log('AuthService: otrzymano zwalidowany token!');
          console.log('Token:', this.oauthService.getAccessToken());
          console.log('Przypisane claimsy:', this.oauthService.getIdentityClaims());
          this.isAuthenticated.set(true);
        } else {
          const session = await this.isSessionCookieValid();

          if (session) {
            this.oauthService
              .silentRefresh()
              .then(() => {
                this.isAuthenticated.set(true);
              })
              .catch((err) => {
                console.warn('Sesja ciasteczkowa wygasła na serwerze.', err);
                this.oauthService.logOut();
                this.isAuthenticated.set(false);

                return;
              });
          }
        }

        if (this.router.url.includes('callback')) {
          this.router.navigate(['/'], { replaceUrl: true });
          console.log('Zalogowano pomyślnie. Token:', this.hasValidToken);
        }
      })
      .catch((error) => {
        console.error('AuthService: Wystąpił błąd podczas pobierania dokumentu discovery:', error);
        this.isAuthenticated.set(false);
        this.authEventSource.next({
          eventType: null,
          error: `Wystąpił błąd podczas pobierania dokumentu discovery: ${error}`,
        });
      });
  }

  public async login() {
    console.log('Funkcja login wywołana');
    try {
      await this.oauthService.loadDiscoveryDocumentAndLogin();
    } catch (err) {
      console.error('Błąd podczas ładowania dokumentu Discovery:', err);
    }
  }

  public logout() {
    console.log('Zainicjalizowane wylogowanie');
    this.oauthService.logOut();
    this.isAuthenticated.set(false);
    this.router.navigate(['/']);
  }

  public get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }

  public get hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  private async isSessionCookieValid(): Promise<SessionStatus> {
    try {
      return await firstValueFrom(
        this.httpClient.get<SessionStatus>(
          `${environment.apiUrl}${API_ENDPOINTS.authEndpoints.sessionStatus}`,
          {
            withCredentials: true,
          },
        ),
      );
    } catch {
      return { isAuthenticated: false };
    }
  }
}
