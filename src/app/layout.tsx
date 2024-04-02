import QueryProvider from './provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';
import { Inter } from 'next/font/google';
import { Provider } from 'jotai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '뭔말이지?',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
