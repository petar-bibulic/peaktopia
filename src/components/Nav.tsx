import Link from 'next/link';
import LoginButton from '@components/auth/LoginButton';
import { getAuth } from 'firebase-admin/auth';
import firebaseAdminApp from '@firebaseAuth/configAdmin';
import { App } from 'firebase-admin/app';
import { cookies } from 'next/headers';
import NavIcon from '@components/NavIcon';
import SidebarToggle from '@components/misc/SidebarToggle';

type Props = {
  inSidebar?: boolean;
};

const Nav = async (props: Props) => {
  const userCookie = cookies().get('userToken');
  try {
    const userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(userCookie?.value as string);
  } catch (err) {
    console.log('User not logged in');
  }

  const graphLink = <Link href={'/data/charts'}>Charts</Link>;

  return (
    <nav className="navbar opacity-90 bg-base-100 sticky top-0 z-40 w-full backdrop-blur border-b-2 border-base-content/10">
      <div className="navbar-start">
        <div className="dropdown">
          <div className="flex flex-row items-center">
            <label htmlFor="my-drawer" aria-label="open sidebar">
              <SidebarToggle />
            </label>
          </div>
        </div>
        {!props.inSidebar ? <NavIcon /> : <NavIcon className="lg:hidden" />}
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="">Use</Link>
          </li>
          <li>
            <Link href="">Tables</Link>
          </li>
          <li>{graphLink}</li>
          <li>
            <Link href="">About</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <LoginButton />
      </div>
    </nav>
  );
};

export default Nav;
