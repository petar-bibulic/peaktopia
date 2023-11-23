type Props = {
  name: string;
  clickHandler: (name: string) => void;
  active: string[];
};

const MenuChartElement = (props: Props) => {
  const { name, clickHandler, active } = props;

  return (
    <li>
      {active.includes(name) ? (
        <div
          className="flex font-semibold border-solid border-l-4 border-green-500 hover:border-green-600 dark:border-green-700 dark:hover:border-green-800"
          onClick={() => clickHandler(name)}
        >
          {name}
        </div>
      ) : (
        <div className="flex ml-1" onClick={() => clickHandler(name)}>
          {name}
        </div>
      )}
    </li>
  );
};

export default MenuChartElement;
