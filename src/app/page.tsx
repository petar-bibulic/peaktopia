import Image from 'next/image';
import LoginForm from '@components/LoginForm';
import Upload from '@components/Upload';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div
        className={`relative flex place-items-center before:-translate-x-1/2
        after:translate-x-1/3 before:lg:h-[200px]`}
      >
        <h1 className="text-3xl  font-bold">Welcome to Peaktopia</h1>
      </div>
      <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex mb-4">
        <p className={`left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static 2xl:w-auto lg:p-4`}>
          Get started by logging in <br />
          or just upload your graphs to start selecting peaks 🚩
        </p>
      </div>
      <Upload accept={['image/png', 'image/jpg']} />
    </main>
  );
}
