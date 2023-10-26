import Link from 'next/link';
import { HiTableCells } from 'react-icons/hi2';
import { BiBarChart, BiInfoSquare, BiBook } from 'react-icons/bi';
import { getAuth } from 'firebase-admin/auth';
import firebaseAdminApp from '@firebaseApp/configAdmin';
import { App } from 'firebase-admin/app';

type Props = {};

const MenuNav = (props: Props) => {
  return (
    <ul className="menu menu-md px-4 py-0 mt-4 text-base-content">
      <li></li>
      <li>
        <Link href="/">
          <span>
            <BiBook className="text-2xl" />
          </span>
          <span>Use</span>
        </Link>
        <Link href="/">
          <span>
            <HiTableCells className="text-2xl" />
          </span>
          <span>Tables</span>
        </Link>
        <Link href={'/data/charts'}>
          <span>
            <BiBarChart className="text-2xl" />
          </span>
          <span>Charts</span>
        </Link>
        <Link href="/">
          <span>
            <BiInfoSquare className="text-2xl" />
          </span>
          <span>About</span>
        </Link>
      </li>
    </ul>
  );
};

export default MenuNav;
