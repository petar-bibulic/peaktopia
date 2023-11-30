'use client';

import Link from 'next/link';
import UploadFileComponent from '@components/data/UploadFileComponent';
import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const Welcome = (props: Props) => {
  const theme = useGlobalStore((state) => state.theme);

  return (
    <div className="w-full relative">
      {theme === 'dark' ? (
        <div className="absolute bottom-0 w-full h-[50vh] bg-cover bg-bottom bg-no-repeat bg-[url('/assets/images/layer1_peaks_dark.svg')]"></div>
      ) : (
        <div className="absolute bottom-0 w-full h-[50vh] bg-cover bg-bottom bg-no-repeat bg-[url('/assets/images/layer1_peaks_light.svg')]"></div>
      )}
      <div className="hero min-h-[calc(100vh-48px)] backdrop-blur-[2px] z-10">
        <div className="hero-content text-center mt-[5vh] mb-[20vh]">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-gray-500 dark:text-gray-300">Welcome to</h1>
            <h1 className="text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-700">
              Peaktopia
            </h1>
            <p className="py-6 tracking-wide leading-9 text-base-content">
              Get started by{' '}
              <Link href="/auth/login" className="underline underline-offset-4 text-primary">
                logging in
              </Link>
              <br />
              or upload your charts to start selecting and comparing peaks 🚩
            </p>
            <UploadFileComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
