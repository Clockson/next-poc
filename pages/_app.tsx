import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserConfig, appWithTranslation } from 'next-i18next';
const i18n = require('../next-i18next.config');

import React from 'react';

function App({ Component, pageProps }: AppProps) {
  return <SessionProvider session={pageProps.session}>
    <React.Suspense>
      <Component {...pageProps} />
    </React.Suspense>
  </SessionProvider>
}

export default appWithTranslation(App, i18n as UserConfig);