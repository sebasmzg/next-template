import Navbar from '@/components/NavBar';
import SessionAuthProvider from '@/context/SessionProvider';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {ReactNode} from 'react';
import StoreProvider from '../../../storeProvider/StoreProvider';

type Props = {
  children: ReactNode;
  params: {locale: string};
};

export default function LocaleLayout({children, params: {locale}}: Props) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <head>
        <title>Riwi test</title>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SessionAuthProvider>
            <StoreProvider>
              <Navbar />
              {children}
            </StoreProvider>
          </SessionAuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
