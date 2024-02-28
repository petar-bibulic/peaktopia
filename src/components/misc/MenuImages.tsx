import { PiImagesBold } from 'react-icons/pi';
import MenuChartElement from '@components/misc/MenuChartElement';
import useGlobalStore from '@hooks/useGlobalStore';
import { useRouter } from 'next/navigation';

type Props = {};

const MenuImages = (props: Props) => {
  const router = useRouter();
  const charts = useGlobalStore((state) => state.charts);
  const activeCharts = useGlobalStore((state) => state.activeCharts);
  const setActiveCharts = useGlobalStore((state) => state.setActiveCharts);

  const onChartSelect = (name: string) => {
    setActiveCharts([name]);
    const fileId = charts.filter((entry) => entry.name === name)[0].id;
    router.push(`/data/image?fileId=${fileId}`);
  };

  return (
    <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
      {/* Sidebar content */}
      <li className="menu-title flex flex-row gap-4 mt-4">
        <span className="text-base-content">
          <PiImagesBold className="text-2xl text-success" />
        </span>
        <span>Images</span>
      </li>
      {charts.length ? (
        charts.map((chart, i) => (
          <MenuChartElement name={chart.name} key={i} clickHandler={onChartSelect} active={activeCharts} />
        ))
      ) : (
        <li style={{ pointerEvents: 'none' }}>
          <span>No images to select</span>
        </li>
      )}
      <li></li>
    </ul>
  );
};

export default MenuImages;
