import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment';
import { AUTH_ENDPOINTS } from '../api-endpoints';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const oauthService = inject(OAuthService);
  const accessToken = oauthService.getAccessToken();

  const isAuthEndpoint = AUTH_ENDPOINTS.some((x) => req.url.endsWith(x));

  if (req.url.startsWith(environment.apiUrl)) {
    let headers: any = {};

    if (accessToken && !isAuthEndpoint) {
      headers = { Authorization: `Bearer ${accessToken}` };
    }

    req = req.clone({
      setHeaders: headers,
      withCredentials: true,
    });
  }

  return next(req);
};
