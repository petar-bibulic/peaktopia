import Upload from '@components/data/Upload';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';
import firebaseAdminApp from '@firebase/configAdmin';
import Nav from '@components/Nav';
import Footer from '@components/Footer';
import Image from 'next/image';

export default async function Home() {
  const userCookie = cookies().get('userToken');

  let acceptedFileFormats;

  try {
    const userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(userCookie?.value as string);
    acceptedFileFormats = ['image/*', '.xrdml'];
  } catch (err) {
    console.log('User not logged in');
    acceptedFileFormats = ['image/*'];
  }

  return (
    <>
      <Nav />
      <main className="flex min-h-screen flex-col items-center">
        <div className="w-full min-h-screen relative">
          <div className="hero absolute top-0 min-h-screen backdrop-blur-[2px] backdrop-brightness-75 z-40">
            <div className="hero-content text-center">
              <div className="max-w-lg">
                <h1 className="text-5xl font-bold">Welcome to</h1>
                <h1 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-700">
                  Peaktopia
                </h1>
                <p className="py-6 tracking-wide leading-9">
                  Get started by{' '}
                  <Link href="/auth/login" className="underline underline-offset-4 text-primary">
                    logging in
                  </Link>
                  <br />
                  or upload your graphs to start selecting and comparing peaks 🚩
                </p>
                <Upload acceptFiles={acceptedFileFormats} />
              </div>
            </div>
          </div>
          <div className="absolute w-full h-full bg-cover bg-top bg-no-repeat bg-[url('/assets/images/blue_peaks.svg')]"></div>
        </div>
        <div className="w-full min-h-screen relative bg-sky-600">Hello second chapter</div>
      </main>
      <Footer />
    </>
  );
}
