import { Account, Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export interface JWTData {
  token: JWT;
  user?: User;
  account?: Account;
}

export interface SessionData {
  session: Session;
  token: JWT;
  user?: User;
}

export interface LogoutMessage {
  session: Session;
  token: JWT;
}
