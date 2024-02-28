import { IoStatsChart } from 'react-icons/io5';
import MenuChartElement from '@components/misc/MenuChartElement';
import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const MenuTables = (props: Props) => {
  const charts = useGlobalStore((state) => state.charts);
  const activeCharts = useGlobalStore((state) => state.activeCharts);
  const setActiveCharts = useGlobalStore((state) => state.setActiveCharts);

  const onChartSelect = (name: string) => {
    activeCharts.includes(name)
      ? setActiveCharts(activeCharts.filter((val) => val !== name))
      : setActiveCharts([...activeCharts, name]);
  };

  return (
    <>
      <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
        {/* Sidebar content */}
        <li className="menu-title flex flex-row gap-4 mt-4">
          <span className="text-base-content">
            <IoStatsChart className="text-2xl text-success" />
          </span>
          <span>Data</span>
        </li>
        {charts.length ? (
          charts.map((chart, i) => (
            <MenuChartElement name={chart.name} key={i} clickHandler={onChartSelect} active={activeCharts} />
          ))
        ) : (
          <li style={{ pointerEvents: 'none' }}>
            <span>No data to select</span>
          </li>
        )}
        <li></li>
      </ul>
    </>
  );
};

export default MenuTables;
