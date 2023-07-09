'use client';

import { useAuth } from '@store/AuthContext';
import Link from 'next/link';
import { logOut } from '@firebase/firebaseAuth';

type Props = {};

const LoginButton = (props: Props) => {
  const userAuth = useAuth();

  return userAuth && !userAuth.isAnonymous ? (
    <button className="btn btn-primary rounded" onClick={logOut}>
      Logout
    </button>
  ) : (
    <Link href="/auth/login" className="btn btn-primary rounded">
      Login
    </Link>
  );
};

export default LoginButton;
