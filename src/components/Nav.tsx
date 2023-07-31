import Link from 'next/link';
import { LiaMountainSolid } from 'react-icons/lia';
import { RxHamburgerMenu } from 'react-icons/rx';
import LoginButton from '@components/auth/LoginButton';
import { getAuth } from 'firebase-admin/auth';
import firebaseAdminApp from '@firebase/configAdmin';
import { App } from 'firebase-admin/app';
import { cookies } from 'next/headers';

type Props = {};

const Nav = async (props: Props) => {
  const userCookie = cookies().get('userToken');
  let userId;
  try {
    const userToken = await getAuth(firebaseAdminApp as App).verifyIdToken(userCookie?.value as string);
    userId = userToken.uid;
  } catch (err) {
    console.log(err);
    console.log('User not logged in');
  }

  const graphLink = <Link href={`/data/${encodeURIComponent(userId as string)}/graph`}>Graphs</Link>;

  return (
    <nav className="navbar opacity-90 bg-base-200 sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div className="flex flex-row items-center">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <RxHamburgerMenu className="text-xl" />
            </label>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="">Showcase</Link>
            </li>
            <li>
              <Link href="">Tables</Link>
            </li>
            <li>{graphLink}</li>
            <li>
              <Link href="">Parent</Link>
              <ul className="p-2">
                <li>
                  <Link href="">Submenu 1</Link>
                </li>
                <li>
                  <Link href="">Submenu 2</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="">About</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="flex items-center">
          <LiaMountainSolid className="text-4xl text-primary" />
          <span className="normal-case text-xl px-2 lg:flex">Peaktopia</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="">Showcase</Link>
          </li>
          <li>
            <Link href="">Tables</Link>
          </li>
          <li>{graphLink}</li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <Link href="">Submenu 1</Link>
                </li>
                <li>
                  <Link href="">Submenu 2</Link>
                </li>
              </ul>
            </details>
          </li>
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
