'use client';

import { RxHamburgerMenu } from 'react-icons/rx';

type Props = {};

const SidebarToggle = (props: Props) => {
  return (
    <div tabIndex={0} className="btn btn-ghost lg:hidden">
      <RxHamburgerMenu className="text-xl text-black dark:text-white" />
    </div>
  );
};

export default SidebarToggle;
