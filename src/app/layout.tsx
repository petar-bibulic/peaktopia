import '@styles/globals.css';
import Nav from '@components/Nav';
import { Inter } from 'next/font/google';
import Footer from '@components/Footer';
import { AuthContextProvider } from '@store/AuthContext';
import { auth } from '@firebase/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Peaktopia',
  description: 'Application for selecting and comparing peaks within 2-D graph data',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral`}>
        <AuthContextProvider>
          <Nav />
          {children}
          <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
