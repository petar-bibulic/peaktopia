import MenuActionElement from '@components/misc/MenuActionElement';
import { HiOutlineCursorClick } from 'react-icons/hi';
import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const TableMenuActions = (props: Props) => {
  const action = useGlobalStore((state) => state.action);
  const setAction = useGlobalStore((state) => state.setAction);

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
      <li>
        <div className="flex ml-1" onClick={() => alert('Export CSV Under construction')}>
          Export CSV
        </div>
      </li>
      <li></li>
    </ul>
  );
};

export default TableMenuActions;
