import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import type { Session, Awaitable } from 'next-auth/core/types';
import { SessionData } from '../../../types/auth';

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID ?? '',
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? '',
      authorization: process.env.KEYCLOAK_AUTHORIZATION ?? '',
      issuer: process.env.KEYCLOAK_ISSUER ?? '',
      wellKnown: process.env.KEYCLOAK_WELLKNOWN ?? '',
    }),
  ],
  callbacks: {
    session: (data: SessionData): Awaitable<Session> => {
      return data.session;
    },
  },
});
