import Upload from '@components/data/Upload';
import Link from 'next/link';
import Nav from '@components/Nav';
import Footer from '@components/Footer';
import MinimalSidebar from '@components/MinimalSidebar';

export default async function Home() {
  return (
    <MinimalSidebar>
      <Nav />
      <main className="flex min-h-screen flex-col items-center">
        <div className="w-full min-h-screen relative">
          <div className="hero absolute top-0 min-h-screen backdrop-blur-[2px] backdrop-brightness-75 z-10">
            <div className="hero-content text-center">
              <div className="max-w-lg">
                <h1 className="text-5xl font-bold">Welcome to</h1>
                <h1 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-700">
                  Peaktopia
                </h1>
                <p className="py-6 tracking-wide leading-9">
                  Get started by{' '}
                  <Link href="/auth/login" className="underline underline-offset-4 text-primary">
                    logging in
                  </Link>
                  <br />
                  or upload your charts to start selecting and comparing peaks 🚩
                </p>
                <Upload />
              </div>
            </div>
          </div>
          <div className="absolute w-full h-full bg-cover bg-top bg-no-repeat bg-[url('/assets/images/blue_peaks.svg')]"></div>
        </div>
        <div className="w-full min-h-screen relative bg-sky-600">Hello second chapter</div>
      </main>
      <Footer />
    </MinimalSidebar>
  );
}
