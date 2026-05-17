import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpInterceptorFn } from '@angular/common/http';
import { API_ENDPOINTS } from '../api-endpoints';
import { from, of, switchMap } from 'rxjs';

const AUTH_ENDPOINTS: readonly string[] = [
  API_ENDPOINTS.authEndpoints.authorize,
  API_ENDPOINTS.authEndpoints.logout,
  API_ENDPOINTS.authEndpoints.token,
  API_ENDPOINTS.authEndpoints.discoveryDocument,
  API_ENDPOINTS.authEndpoints.jwks,
] as const;

export const sessionRefresherInterceptor: HttpInterceptorFn = (req, next) => {
  const oauthService = inject(OAuthService);
  const accessToken = oauthService.getAccessToken();

  const exists = AUTH_ENDPOINTS.some((x) => req.url.endsWith(x));

  if (!exists && accessToken) {
    if (oauthService.hasValidAccessToken()) {
      return next(req);
    } else {
      return from(oauthService.silentRefresh()).pipe(switchMap((x) => next(req)));
    }
  }

  return next(req);
};
