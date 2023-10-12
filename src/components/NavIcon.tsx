import Link from 'next/link';
import { LiaMountainSolid } from 'react-icons/lia';

type Props = {
  className?: string;
};

const NavIcon = (props: Props) => {
  return (
    <Link href="/" className={`flex items-center justify-start btn btn-ghost ${props.className}`}>
      <LiaMountainSolid className="text-4xl text-primary" />
      <span className="normal-case text-xl px-2 lg:flex">Peaktopia</span>
    </Link>
  );
};

export default NavIcon;
