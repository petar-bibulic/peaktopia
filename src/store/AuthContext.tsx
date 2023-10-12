'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@firebase/config';
import { onAuthStateChanged, User, onIdTokenChanged } from 'firebase/auth';
import { useCookies } from 'react-cookie';

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [userToken, setUserToken] = useCookies(['userToken']);
  const storageObj: Storage | null = typeof window !== 'undefined' ? localStorage : null;

  useEffect(() => {
    const authInit = onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          setUserAuth(user);
          setUserToken('userToken', token, { path: '/' });
          storageObj?.setItem(
            'user',
            JSON.stringify({
              uid: user.uid,
              isAnonymous: user.isAnonymous,
              photoURL: user.photoURL,
              displayName: user.displayName,
            })
          );
        } catch (e) {
          console.warn(`Error while trying to login: ${e}`);
        }
      } else {
        setUserAuth(null);
        setUserToken('userToken', '', { path: '/' });
        storageObj?.removeItem('user');
      }
    });

    return () => authInit();
  }, [userAuth]);

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

export const useAuthContext = () => useContext(AuthContext);
