'use client';

import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const HowToUse = (props: Props) => {
  const theme = useGlobalStore((state) => state.theme);

  return (
    <div className="w-full flex h-full flex-col relative">
      {theme === 'dark' ? (
        <div className="absolute bottom-0 w-full h-[50vh] bg-cover bg-bottom bg-no-repeat bg-[url('/assets/images/layer2_peaks_dark.svg')]"></div>
      ) : (
        <div className="absolute bottom-0 w-full h-[50vh] bg-cover bg-bottom bg-no-repeat bg-[url('/assets/images/layer2_peaks_light.svg')]"></div>
      )}
      <div className="hero min-h-screen backdrop-blur-[2px] z-10">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <p className="py-6 mb-[30vh] mx-5 text-left text-base-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet lorem neque. Fusce vulputate a
              ex nec convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Mauris id mollis orci, ut varius lorem. Mauris non sapien pulvinar, auctor massa eu, molestie
              quam. Pellentesque auctor tristique ultricies. Mauris posuere ullamcorper nisl at elementum. Morbi in
              venenatis diam, eget ultricies quam. Mauris neque nisi, porta vitae libero quis, scelerisque fringilla
              ligula. Quisque molestie porttitor nisl, eget convallis eros placerat eu. Phasellus dignissim diam vel
              metus tempus sollicitudin. Etiam in sapien ante. Quisque a purus et arcu sagittis condimentum nec posuere
              turpis. In a augue at dui venenatis hendrerit. Ut id ex vel augue fringilla mattis. Phasellus sed ipsum
              scelerisque, laoreet leo eget, tempus nibh. Suspendisse consequat congue diam nec tincidunt. Vivamus
              gravida libero nec urna rhoncus porta. Quisque sed pretium ex, at suscipit leo. Phasellus condimentum
              fermentum facilisis. Pellentesque ac felis sit amet libero gravida faucibus ac a urna. Duis gravida arcu
              eget lacus varius feugiat. Donec porta ligula id augue aliquet cursus. Suspendisse pulvinar ligula elit,
              nec lacinia sapien fringilla vel. Nullam venenatis orci tellus, nec sollicitudin ante rhoncus sit amet.
              Donec varius sodales purus. Nulla lacus libero, viverra vel tortor et, consequat auctor nunc. Maecenas
              quis est eget eros tincidunt aliquet sit amet sed nibh. Donec aliquet quam eu enim varius posuere.
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. nunc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
