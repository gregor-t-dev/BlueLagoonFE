export const API_ENDPOINTS = {
  authEndpoints: {
    authorize: '/connect/authorize',
    token: '/connect/token',
    logout: '/connect/logout',
    discoveryDocument: '/.well-known/openid-configuration',
    jwks: '/.well-known/jwks',
    sessionStatus: '/session/status',
  },
} as const;

export const AUTH_ENDPOINTS: readonly string[] = [
  API_ENDPOINTS.authEndpoints.authorize,
  API_ENDPOINTS.authEndpoints.logout,
  API_ENDPOINTS.authEndpoints.token,
  API_ENDPOINTS.authEndpoints.discoveryDocument,
  API_ENDPOINTS.authEndpoints.jwks,
  API_ENDPOINTS.authEndpoints.sessionStatus,
] as const;
