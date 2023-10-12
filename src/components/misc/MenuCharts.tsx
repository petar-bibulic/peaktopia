import { HiOutlineClipboardList } from 'react-icons/hi';
import MenuChartElement from './MenuChartElement';
import useActionStore from '@hooks/useActionStore';

type Props = {};

const MenuCharts = (props: Props) => {
  const charts = useActionStore((state) => state.charts);
  const activeCharts = useActionStore((state) => state.activeCharts);
  const setActiveCharts = useActionStore((state) => state.setActiveCharts);

  const onChartSelect = (name: string) => {
    activeCharts.includes(name)
      ? setActiveCharts(activeCharts.filter((val) => val !== name))
      : setActiveCharts([...activeCharts, name]);
  };

  return (
    <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
      {/* Sidebar content */}
      <li className="menu-title flex flex-row gap-4 mt-4">
        <span className="text-base-content">
          <HiOutlineClipboardList className="text-2xl text-success" />
        </span>
        <span>Charts</span>
      </li>
      {charts.map((chart, i) => (
        <MenuChartElement name={chart.name} key={i} clickHandler={onChartSelect} />
      ))}
      <li></li>
    </ul>
  );
};

export default MenuCharts;
