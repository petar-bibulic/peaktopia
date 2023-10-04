import { HiOutlineClipboardList } from 'react-icons/hi';
import MenuChartElement from './MenuChartElement';

type Props = {};

const MenuCharts = (props: Props) => {
  return (
    <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
      {/* Sidebar content */}
      <li className="menu-title flex flex-row gap-4 mt-4">
        <span className="text-base-content">
          <HiOutlineClipboardList className="text-2xl text-success" />
        </span>
        <span>Charts</span>
      </li>
      <MenuChartElement text="Chart 1" isActive={false} />
      <MenuChartElement text="Chart 2" isActive={true} />
      <li></li>
    </ul>
  );
};

export default MenuCharts;
