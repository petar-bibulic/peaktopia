import MenuActionElement from '@components/misc/MenuActionElement';
import { HiOutlineCursorClick } from 'react-icons/hi';
import useGlobalStore from '@hooks/useGlobalStore';
import useIsMobile from '@hooks/useIsMobile';
import { useEffect, useState } from 'react';

type Props = {};

const ChartMenuActions = (props: Props) => {
  const action = useGlobalStore((state) => state.action);
  const setAction = useGlobalStore((state) => state.setAction);
  const isMobile = useIsMobile();
  const [render, setRender] = useState(false);

  useEffect(() => {
    // use effect to prevent different server and client side props
    setRender(isMobile);

    return () => {};
  }, [isMobile]);

  return (
    <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
      {/* Sidebar content */}
      <li></li>
      <li className="menu-title flex flex-row gap-4 mt-4">
        <span className="text-base-content">
          <HiOutlineCursorClick className="text-2xl text-accent" />
        </span>
        <span>Actions</span>
      </li>
      <MenuActionElement
        clickHandler={setAction}
        action="S"
        isActive={action.toUpperCase() === 'S' ? true : false}
        text="Select peaks"
        keyShortcut="S"
      />
      <MenuActionElement
        clickHandler={setAction}
        action="D"
        isActive={action.toUpperCase() === 'D' ? true : false}
        text="Deselect peaks"
        keyShortcut="D"
      />
      <MenuActionElement
        clickHandler={setAction}
        action=""
        isActive={false}
        text="Cancel operations"
        keyShortcut="Esc"
      />
      <MenuActionElement
        clickHandler={setAction}
        action="A"
        isActive={action.toUpperCase() === 'A' ? true : false}
        text="Annotate peaks"
        keyShortcut="A"
      />
      <div className={render === true ? 'block' : 'hidden'}>
        <MenuActionElement clickHandler={setAction} action="" isActive={false} text="Zoom out" sideEffect="zoomOut" />
      </div>
      <li></li>
    </ul>
  );
};

export default ChartMenuActions;
