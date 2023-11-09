import React from 'react';

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
          className="flex  bg-green-500 hover:bg-green-600  dark:bg-green-700 dark:hover:bg-green-800"
          onClick={() => modifiedClickHandler(action)}
        >
          {text}
          {keyShortcut ? <kbd className="kbd kbd-sm">{keyShortcut}</kbd> : null}
        </div>
      ) : (
        <div className="flex" onClick={() => modifiedClickHandler(action)}>
          {text}
          {keyShortcut ? <kbd className="kbd kbd-sm">{keyShortcut}</kbd> : null}
        </div>
      )}
    </li>
  );
};

export default MenuActionElement;
