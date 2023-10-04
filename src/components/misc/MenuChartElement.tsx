import React from 'react';

type Props = {
  text: string;
  isActive: boolean;
};

const MenuChartElement = (props: Props) => {
  const { text, isActive } = props;

  return (
    <li>
      {isActive ? (
        <div className="flex bg-orange-600 hover:bg-orange-700" onClick={() => console.log('clicked')}>
          {text}
        </div>
      ) : (
        <div className="flex" onClick={() => console.log('clicked')}>
          {text}
        </div>
      )}
    </li>
  );
};

export default MenuChartElement;
