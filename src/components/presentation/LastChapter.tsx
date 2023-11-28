'use client';

import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const LastChapter = (props: Props) => {
  const theme = useGlobalStore((state) => state.theme);

  return (
    <div className="w-full min-h-screen relative bg-slate-900">
      {theme === 'dark' ? (
        <div className="absolute bottom-0 w-full h-[50vh] bg-cover bg-bottom bg-no-repeat bg-[url('/assets/images/layer3_peaks_dark.svg')]"></div>
      ) : (
        <div className="absolute bottom-0 w-full h-[50vh] bg-cover bg-bottom bg-no-repeat bg-[url('/assets/images/layer3_peaks_light.svg')]"></div>
      )}
      <div className="hero min-h-screen backdrop-blur-[2px] z-10">Third chapter</div>
    </div>
  );
};

export default LastChapter;
