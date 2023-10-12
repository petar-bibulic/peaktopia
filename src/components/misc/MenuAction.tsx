import MenuActionElement from '@components/misc/MenuActionElement';
import { HiOutlineCursorClick } from 'react-icons/hi';
import useActionStore from '@hooks/useActionStore';

type Props = {};

const MenuAction = (props: Props) => {
  const action = useActionStore((state) => state.action);
  const setAction = useActionStore((state) => state.setAction);

  return (
    <ul className="menu menu-sm lg:menu-md px-4 py-0 text-base-content">
      {/* Sidebar content */}
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
      <li></li>
    </ul>
  );
};

export default MenuAction;
