import useGlobalStore from '@hooks/useGlobalStore';

type Props = {
  clickHandler: (action: string) => void;
  action: string;
  isActive: boolean;
  text: string;
  sideEffect?: string;
  keyShortcut?: string;
  disabled?: boolean;
};

const MenuActionElement = (props: Props) => {
  const { clickHandler, action, isActive, text, keyShortcut, sideEffect, disabled } = props;
  const sideEffects = useGlobalStore((state) => state.sideEffects);

  const modifiedClickHandler = (action: string) => {
    if (isActive) {
      clickHandler('');
    } else {
      clickHandler(action);
    }
    if (sideEffect && sideEffects.hasOwnProperty(sideEffect)) {
      sideEffects[sideEffect](); // call side effect if present
    }
  };

  return (
    <li className={disabled ? 'disabled' : ''}>
      {isActive && !disabled ? (
        <div
          className="flex font-semibold border-solid border-l-4 border-green-500 hover:border-green-600 dark:border-green-700 dark:hover:border-green-800"
          onClick={() => modifiedClickHandler(action)}
        >
          {text}
          {keyShortcut && <kbd className="kbd kbd-sm">{keyShortcut}</kbd>}
        </div>
      ) : (
        <div
          style={{ pointerEvents: disabled ? 'none' : 'auto' }}
          className="flex ml-1"
          onClick={() => modifiedClickHandler(action)}
        >
          {text}
          {keyShortcut && <kbd className="kbd kbd-sm">{keyShortcut}</kbd>}
        </div>
      )}
    </li>
  );
};

export default MenuActionElement;
