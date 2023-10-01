import Footer from '@components/Footer';
import Sidebar from '@components/Sidebar';
import Nav from '@components/Nav';

export default function DataLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Sidebar>
        <Nav />
        {children}
        <Footer />
      </Sidebar>
    </main>
  );
}
