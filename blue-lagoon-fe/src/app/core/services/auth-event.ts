import { EventType } from 'angular-oauth2-oidc';

export type AuthEvent = {
  eventType: EventType | null;
  error?: string;
};
