import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { SessionData } from '../types/auth';

function MyApp({ Component, pageProps }: AppProps<SessionData>) {
  return (
    <SessionProvider
      session={pageProps.session}
      baseUrl='/realms/spacemoon/protocol/openid-connect/auth'
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}
export default MyApp;
