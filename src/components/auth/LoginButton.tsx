'use client';

import { useAuth } from '@store/AuthContext';
import Link from 'next/link';
import { logOut } from '@firebase/firebaseAuth';
import Image from 'next/image';

type Props = {};

const LoginButton = (props: Props) => {
  const userAuth = useAuth();

  return userAuth && !userAuth.isAnonymous ? (
    <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
      <div className="avatar m-2">
        <div tabIndex={0} className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <Image width={100} height={100} alt="Avatar image" src={userAuth?.photoURL as string} />
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <button onClick={logOut}>Logout</button>
            </li>
            <li>
              <a>Profile</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <Link href="/auth/login" className="btn btn-primary rounded">
      Login
    </Link>
  );
};

export default LoginButton;
