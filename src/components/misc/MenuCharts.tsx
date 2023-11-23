import { HiOutlineClipboardList } from 'react-icons/hi';
import { PiImagesBold } from 'react-icons/pi';
import MenuChartElement from '@components/misc/MenuChartElement';
import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const MenuCharts = (props: Props) => {
  const charts = useGlobalStore((state) => state.charts);
  const images = useGlobalStore((state) => state.processedImages);
  const activeCharts = useGlobalStore((state) => state.activeCharts);
  const setActiveCharts = useGlobalStore((state) => state.setActiveCharts);
  const activeImages = useGlobalStore((state) => state.activeImages);
  const setActiveImages = useGlobalStore((state) => state.setActiveImages);

  const onChartSelect = (name: string) => {
    activeCharts.includes(name)
      ? setActiveCharts(activeCharts.filter((val) => val !== name))
      : setActiveCharts([...activeCharts, name]);
  };

  const onImageSelect = (name: string) => {
    activeImages.includes(name)
      ? setActiveImages(activeImages.filter((val) => val !== name))
      : setActiveImages([...activeImages, name]);
  };

  return (
    <>
      <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
        {/* Sidebar content */}
        <li className="menu-title flex flex-row gap-4 mt-4">
          <span className="text-base-content">
            <HiOutlineClipboardList className="text-2xl text-success" />
          </span>
          <span>Charts</span>
        </li>
        {charts.map((chart, i) => (
          <MenuChartElement name={chart.name} key={i} clickHandler={onChartSelect} active={activeCharts} />
        ))}
        <li></li>
      </ul>
      {images.length > 0 && (
        <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
          {/* Sidebar content */}
          <li className="menu-title flex flex-row gap-4 mt-4">
            <span className="text-base-content">
              <PiImagesBold className="text-2xl text-info" />
            </span>
            <span>Processed images</span>
          </li>
          {images.map((image, i) => (
            <MenuChartElement name={image.name} key={i} clickHandler={onImageSelect} active={activeImages} />
          ))}
          <li></li>
        </ul>
      )}
    </>
  );
};

export default MenuCharts;
