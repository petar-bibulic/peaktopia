import '@styles/globals.css';
import { Inter } from 'next/font/google';
import { AuthContextProvider } from '@store/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Peaktopia',
  description: 'Application for selecting and comparing peaks within 2-D graph data',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-base-100`}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
