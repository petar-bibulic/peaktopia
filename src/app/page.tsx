import Upload from '@components/data/Upload';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { App } from 'firebase-admin/app';
import firebaseAdminApp from '@firebase/configAdmin';

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
    <main className="flex min-h-screen flex-col items-center">
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Welcome to Peaktopia</h1>
            <p className="py-6 tracking-wide leading-9">
              Get started by{' '}
              <Link href="/auth/login" className="underline underline-offset-4 text-primary">
                logging in
              </Link>
              <br />
              or <br />
              upload your graphs to start selecting and comparing peaks 🚩
            </p>
            <Upload acceptFiles={acceptedFileFormats} />
          </div>
        </div>
      </div>
    </main>
  );
}
