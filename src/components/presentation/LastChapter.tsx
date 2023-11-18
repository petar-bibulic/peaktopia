'use client';

import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const LastChapter = (props: Props) => {
  const theme = useGlobalStore((state) => state.theme);

  return (
    <div className="w-full min-h-screen relative bg-slate-900">
      <svg
        id="visual"
        viewBox="0 0 960 540"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        className="absolute bottom-0 min-w-[600px]"
      >
        <path
          d="M0 404L107 383L213 399L320 408L427 374L533 376L640 396L747 385L853 366L960 377L960 541L853 541L747 541L640 541L533 541L427 541L320 541L213 541L107 541L0 541Z"
          fill="#115e59"
        ></path>
        <path
          d="M0 419L107 416L213 423L320 393L427 391L533 406L640 408L747 436L853 425L960 421L960 541L853 541L747 541L640 541L533 541L427 541L320 541L213 541L107 541L0 541Z"
          fill="#004c55"
        ></path>
        <path
          d="M0 427L107 442L213 438L320 462L427 439L533 435L640 459L747 453L853 464L960 453L960 541L853 541L747 541L640 541L533 541L427 541L320 541L213 541L107 541L0 541Z"
          fill="#003a4b"
        ></path>
        <path
          d="M0 488L107 492L213 471L320 470L427 457L533 459L640 479L747 462L853 467L960 454L960 541L853 541L747 541L640 541L533 541L427 541L320 541L213 541L107 541L0 541Z"
          fill="#0a283c"
        ></path>
        <path
          d="M0 521L107 511L213 520L320 505L427 510L533 506L640 516L747 508L853 486L960 518L960 541L853 541L747 541L640 541L533 541L427 541L320 541L213 541L107 541L0 541Z"
          fill={theme === 'dark' ? '#1d232a' : '#ffffff'}
        ></path>
      </svg>
      {/* <div className="absolute bottom-0 w-full h-[50vh] bg-cover bg-bottom bg-no-repeat bg-[url('/assets/images/layer3_peaks.svg')]"></div> */}
      <div className="hero min-h-screen backdrop-blur-[2px] z-10">Third chapter</div>
    </div>
  );
};

export default LastChapter;
