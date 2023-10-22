import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {};

const SidebarTop = (props: Props) => {
  return (
    <div className="static h-12 lg:hidden">
      <div className="avatar absolute top-4 left-4">
        <div className="w-10 rounded-full bg-neutral-400">
          <Image src="/icon.svg" width={50} height={50} alt="Peaktopia logo" />
        </div>
      </div>
      <label htmlFor="my-drawer" className="btn btn-ghost absolute right-2 top-4">
        <AiOutlineClose className="text-lg" />
      </label>
    </div>
  );
};

export default SidebarTop;
