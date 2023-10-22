'use client';

import { usePathname } from 'next/navigation';
import MenuAction from '@components/misc/MenuAction';
import MenuCharts from '@components/misc/MenuCharts';
import MenuNav from '@components/misc/MenuNav';
import NavIcon from '@components/NavIcon';
import SidebarTop from '@components/misc/SidebarTop';

type Props = {
  children: React.ReactNode;
};

const Sidebar = (props: Props) => {
  const currentRoute = usePathname();
  console.log(currentRoute);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        {/* Content goes here */}
        {props.children}
      </div>
      <div className="drawer-side z-40 scroll-smooth scroll-p-2 fixed">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-100 w-80 h-screen sticky border-r-2 border-base-content/10">
          <div className="sticky top-1 gap-2 px-4 py-2 items-left hidden lg:block">
            <NavIcon />
          </div>
          <SidebarTop />
          <div className="lg:hidden">
            <MenuNav />
          </div>
          <MenuAction />
          <MenuCharts />
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
