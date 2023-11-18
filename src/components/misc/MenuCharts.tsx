import { HiOutlineClipboardList } from 'react-icons/hi';
import MenuChartElement from '@components/misc/MenuChartElement';
import useGlobalStore from '@hooks/useGlobalStore';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
};

const MenuCharts = (props: Props) => {
  const router = useRouter();
  const charts = useGlobalStore((state) => state.charts);
  const activeCharts = useGlobalStore((state) => state.activeCharts);
  const setActiveCharts = useGlobalStore((state) => state.setActiveCharts);

  const onChartSelect = (name: string) => {
    if (props.title === 'Images') {
      setActiveCharts([name]);
      const fileId = charts.filter((entry) => entry.name === name)[0].id;
      router.push(`/data/image?fileId=${fileId}`);
    } else {
      activeCharts.includes(name)
        ? setActiveCharts(activeCharts.filter((val) => val !== name))
        : setActiveCharts([...activeCharts, name]);
    }
  };

  return (
    <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
      {/* Sidebar content */}
      <li className="menu-title flex flex-row gap-4 mt-4">
        <span className="text-base-content">
          <HiOutlineClipboardList className="text-2xl text-success" />
        </span>
        <span>{props.title}</span>
      </li>
      {charts.map((chart, i) => (
        <MenuChartElement name={chart.name} key={i} clickHandler={onChartSelect} />
      ))}
      <li></li>
    </ul>
  );
};

export default MenuCharts;
