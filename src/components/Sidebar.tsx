'use client';

import { usePathname } from 'next/navigation';
import ChartMenuActions from '@components/misc/ChartMenuActions';
import ImageMenuActions from '@components/misc/ImageMenuActions';
import TableMenuActions from '@components/misc/TableMenuActions';
import MenuCharts from '@components/misc/MenuCharts';
import MenuImages from '@components/misc/MenuImages';
import MenuTables from '@components/misc/MenuTables';
import MenuNav from '@components/misc/MenuNav';
import NavIcon from '@components/misc/NavIcon';
import SidebarTop from '@components/misc/SidebarTop';

type Props = {
  children: React.ReactNode;
};

const Sidebar = (props: Props) => {
  const currentRoute = usePathname();

  let type;
  if (currentRoute.includes('chart')) {
    type = 'chart';
  } else if (currentRoute.includes('image')) {
    type = 'image';
  } else if (currentRoute.includes('table')) {
    type = 'table';
  } else {
    console.warn('Cannot find supported route to use in sidebar.');
    type = null;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center">
        {/* Content goes here */}
        {props.children}
      </div>
      <div className="drawer-side z-40 scroll-smooth scroll-p-2 fixed">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-100 w-80 h-screen sticky border-r-2 border-base-content/10 overflow-y-auto">
          <div className="sticky top-1 gap-2 px-4 py-2 items-left hidden lg:block">
            <NavIcon />
          </div>
          <SidebarTop />
          <div className="lg:hidden">
            <MenuNav />
          </div>
          {type === 'chart' && (
            <>
              <ChartMenuActions />
              <MenuCharts />
            </>
          )}
          {type === 'image' && (
            <>
              <ImageMenuActions />
              <MenuImages />
            </>
          )}
          {type === 'table' && (
            <>
              <TableMenuActions />
              <MenuTables />
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
