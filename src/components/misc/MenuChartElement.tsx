import useGlobalStore from '@hooks/useGlobalStore';

type Props = {
  name: string;
  clickHandler: (name: string) => void;
};

const MenuChartElement = (props: Props) => {
  const activeCharts = useGlobalStore((state) => state.activeCharts);
  const { name, clickHandler } = props;

  return (
    <li>
      {activeCharts.includes(name) ? (
        <div
          className="flex bg-green-500 hover:bg-green-600  dark:bg-green-700 dark:hover:bg-green-800"
          onClick={() => clickHandler(name)}
        >
          {name}
        </div>
      ) : (
        <div className="flex" onClick={() => clickHandler(name)}>
          {name}
        </div>
      )}
    </li>
  );
};

export default MenuChartElement;
