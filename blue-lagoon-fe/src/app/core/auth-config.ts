import { AuthConfig } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:5000/',
  redirectUri: window.location.origin + '/callback',
  clientId: 'blue-frontend-app',
  responseType: 'code',
  scope: 'profile offline_access iam',
  showDebugInformation: true,
  requireHttps: false, // Only for development
  clockSkewInSec: 0,
};
