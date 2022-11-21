import { toBoolean } from '../utils/envVariableUtils';

let protocol = 'http';
const base = process.env.NEXT_PUBLIC_SERVER_URL;
const tls = process.env.NEXT_PUBLIC_SERVER_TLS;

if (toBoolean(tls)) {
  protocol += 's://';
} else {
  protocol += '://';
}

export const fullUrl = protocol + base;
export type APISuccessHandler = (resp: Response) => void | PromiseLike<void>;
export type APIFailureHandler = (reason: any) => void | PromiseLike<never>;
