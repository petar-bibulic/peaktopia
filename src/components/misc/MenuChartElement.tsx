import useActionStore from '@hooks/useActionStore';

type Props = {
  name: string;
  clickHandler: (name: string) => void;
};

const MenuChartElement = (props: Props) => {
  const activeCharts = useActionStore((state) => state.activeCharts);
  const { name, clickHandler } = props;

  return (
    <li>
      {activeCharts.includes(name) ? (
        <div className="flex bg-orange-700 hover:bg-orange-800" onClick={() => clickHandler(name)}>
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
