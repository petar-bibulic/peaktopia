'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@firebase/config';
import { anonSignIn } from '@firebase/firebaseAuth';
import { onAuthStateChanged, User, onIdTokenChanged } from 'firebase/auth';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [userToken, setUserToken] = useCookies(['userToken']);

  useEffect(() => {
    const authInit = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUserAuth(user);
        setUserToken('userToken', token, { path: '/' });
      } else {
        console.error('User not logged in');
        setUserAuth(null);
        setUserToken('userToken', '', { path: '/' });
      }
    });

    return () => authInit();
  });

  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.getIdToken(true);
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return <AuthContext.Provider value={userAuth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
