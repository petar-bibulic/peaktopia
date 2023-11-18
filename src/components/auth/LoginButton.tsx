'use client';

import { useAuthContext } from '@store/AuthContext';
import Link from 'next/link';
import { logOut } from '@firebaseApp/authUtils';
import Image from 'next/image';

type Props = {};

const LoginButton = (props: Props) => {
  const user = useAuthContext();

  return user && !user.isAnonymous ? (
    <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
      <div className="avatar m-2">
        <div tabIndex={0} className="w-10 rounded-full hover:ring ring-primary">
          {user?.photoURL && <Image width={100} height={100} alt="Avatar image" src={user.photoURL} />}
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li className="text-base-content">
              <button onClick={logOut}>Logout</button>
            </li>
            <li className="text-base-content">
              <a>Profile</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ) : (
    <Link href="/auth/login" className="btn btn-primary rounded my-1">
      Login
    </Link>
  );
};

export default LoginButton;
