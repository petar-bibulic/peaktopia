'use client';

import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const LastChapter = (props: Props) => {
  const theme = useGlobalStore((state) => state.theme);

  return (
    <div className="w-full min-h-screen relative">
      {theme === 'dark' ? (
        <div className="absolute bottom-0 w-full h-[50vh] bg-cover bg-bottom bg-no-repeat bg-[url('/assets/images/layer3_peaks_dark.svg')]"></div>
      ) : (
        <div className="absolute bottom-0 w-full h-[50vh] bg-cover bg-bottom bg-no-repeat bg-[url('/assets/images/layer3_peaks_light.svg')]"></div>
      )}
      <div className="hero min-h-screen backdrop-blur-[2px] z-10">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <p className="py-6 mb-[30vh] mx-5 text-left text-base-content">Third chapter</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastChapter;
