import Link from 'next/link';
import { LiaMountainSolid } from 'react-icons/lia';

type Props = {};

const NavIcon = (props: Props) => {
  return (
    <Link href="/" className="flex items-center">
      <LiaMountainSolid className="text-4xl text-primary" />
      <span className="normal-case text-xl px-2 lg:flex">Peaktopia</span>
    </Link>
  );
};

export default NavIcon;
