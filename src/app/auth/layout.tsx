import RootLayout from '@app/layout';
import Footer from '@components/Footer';
import Nav from '@components/Nav';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center">
        <section className="lg:h-screen">
          <div className="container h-full px-6 py-24">
            <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">{children}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
