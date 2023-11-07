import MenuActionElement from '@components/misc/MenuActionElement';
import { HiOutlineCursorClick } from 'react-icons/hi';
import useActionStore from '@hooks/useActionStore';
import useIsMobile from '@hooks/useIsMobile';

type Props = {};

const ChartMenuActions = (props: Props) => {
  const action = useActionStore((state) => state.action);
  const setAction = useActionStore((state) => state.setAction);
  const isMobile = useIsMobile();

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
      {isMobile && (
        <>
          <MenuActionElement
            clickHandler={setAction}
            action="Z"
            isActive={action.toUpperCase() === 'Z' ? true : false}
            text="Zoom"
            keyShortcut="Z"
          />
          <MenuActionElement clickHandler={setAction} action="" isActive={false} text="Zoom out" keyShortcut="Ctrl-Z" />
        </>
      )}
      <li></li>
    </ul>
  );
};

export default ChartMenuActions;
