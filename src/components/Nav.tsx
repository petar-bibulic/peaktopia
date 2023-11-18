import Link from 'next/link';
import LoginButton from '@components/auth/LoginButton';
import { getAuth } from 'firebase-admin/auth';
import firebaseAdminApp from '@firebaseApp/configAdmin';
import { App } from 'firebase-admin/app';
import { cookies } from 'next/headers';
import NavIcon from '@components/misc/NavIcon';
import SidebarToggle from '@components/misc/SidebarToggle';
import ThemeSwitch from '@components/ThemeSwitch';
import { NAV_LINKS } from '@utils/constants';

type Props = {
  inSidebar?: boolean;
};

const Nav = async (props: Props) => {
  const userCookie = cookies().get('userToken');
  try {
    const userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(userCookie?.value as string);
  } catch (e) {
    console.log('User not logged in');
  }

  // bg-base color is not compatible with backdrop-blur
  return (
    <nav className="navbar bg-base-100 sticky top-0 z-40 w-full border-b-2 border-base-content/10">
      <div className="navbar-start">
        <div className="dropdown">
          <div className="flex flex-row items-center">
            <label htmlFor="my-drawer" aria-label="open sidebar">
              <SidebarToggle />
            </label>
          </div>
        </div>
        {!props.inSidebar ? <NavIcon /> : <NavIcon className="lg:hidden" />}
        <ThemeSwitch />
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {NAV_LINKS.map((item, index) => (
            <li key={index}>
              <div>
                <Link href={item.url} className="my-[2px] text-base-content">
                  {item.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <LoginButton />
      </div>
    </nav>
  );
};

export default Nav;
