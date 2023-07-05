import Upload from '@components/Upload';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div
        className={`relative flex place-items-center before:-translate-x-1/2
        after:translate-x-1/3 before:lg:h-[200px]`}
      >
        <h1 className="text-3xl font-bold">Welcome to Peaktopia</h1>
      </div>
      <div className="w-full items-center justify-between font-mono text-sm lg:flex mb-4">
        <div className="left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static 2xl:w-auto lg:p-4 tracking-wide leading-9">
          <span>
            Get started by{' '}
            <Link href="/auth/login" className="underline underline-offset-4 text-primary">
              logging in
            </Link>
            <br />
            or <br />
            upload your graphs to start selecting and comparing peaks 🚩
          </span>
        </div>
      </div>
      <Upload accept={['image/*']} />
    </main>
  );
}
