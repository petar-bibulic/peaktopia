type Props = {
  clickHandler: (action: string) => void;
  action: string;
  isActive: boolean;
  text: string;
  keyShortcut: string | null;
};

const MenuActionElement = (props: Props) => {
  const { clickHandler, action, isActive, text, keyShortcut } = props;

  const modifiedClickHandler = (action: string) => {
    if (isActive) {
      clickHandler('');
    } else {
      clickHandler(action);
    }
  };

  return (
    <li>
      {isActive ? (
        <div
          // className="flex bg-green-500 hover:bg-green-600  dark:bg-green-700 dark:hover:bg-green-800"
          className="flex ease-in-out font-semibold border-solid border-l-4 border-l-green-500 hover:border-l-green-600 dark:border-green-700 dark:hover:border-gree-800"
          onClick={() => modifiedClickHandler(action)}
        >
          {text}
          {keyShortcut && <kbd className="kbd kbd-sm">{keyShortcut}</kbd>}
        </div>
      ) : (
        <div className="flex ml-1" onClick={() => modifiedClickHandler(action)}>
          {text}
          {keyShortcut && <kbd className="kbd kbd-sm">{keyShortcut}</kbd>}
        </div>
      )}
    </li>
  );
};

export default MenuActionElement;
