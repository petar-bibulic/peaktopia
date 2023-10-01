'use client';

import { usePathname } from 'next/navigation';
import MenuAction from './MenuAction';
import MenuCharts from './MenuCharts';

type Props = {
  children: React.ReactNode;
};

const Sidebar = (props: Props) => {
  const currentRoute = usePathname();
  console.log(currentRoute);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        {/* Content goes here */}
        {props.children}
      </div>
      <div className="drawer-side z-40 scroll-smooth scroll-p-2 fixed">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <aside className="bg-base-100 w-80 h-screen sticky border-r-2 border-base-content/10">
          <MenuAction />
          <MenuCharts />
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
