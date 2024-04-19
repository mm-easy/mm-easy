import QueryProvider from './provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'jotai';
import { ToastContainer } from 'react-toastify';
import { gothic_a1 } from './styles/font';

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
      <body className={`bg-bgColor1 ${gothic_a1.className}`}>
        <main className="mx-auto bg-white lg:w-[1444px] lg:border-x-2 lg:border-solid lg:border-pointColor1 md:w-full ">
          <Provider>
            <QueryProvider>
              <Header />
              <ToastContainer />
              {children}
              <Footer />
            </QueryProvider>
          </Provider>
        </main>
      </body>
    </html>
  );
}
