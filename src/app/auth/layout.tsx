import RootLayout from '@app/layout';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="lg:h-screen">
        <div className="container h-full px-6 py-24">
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">{children}</div>
        </div>
      </section>
    </main>
  );
}
