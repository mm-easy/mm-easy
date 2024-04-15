import QueryProvider from './provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Provider } from 'jotai';
import { ToastContainer } from 'react-toastify';
import { gothic_a1 } from './styles/font';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '뭔말이지?',
  description: '퀴즈와 게임으로 배우는 재미있는 한국어 세상!',
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={gothic_a1.className}>
        <Provider>
          <QueryProvider>
            <Header />
            <ToastContainer />
            {children}
            <Footer />
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
