'use client';

import { RxHamburgerMenu } from 'react-icons/rx';

type Props = {};

const SidebarToggle = (props: Props) => {
  return (
    <div tabIndex={0} className="btn btn-ghost lg:hidden">
      <RxHamburgerMenu className="text-xl" />
    </div>
  );
};

export default SidebarToggle;
