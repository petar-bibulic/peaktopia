'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@firebase/config';
import { anonSignIn } from '@firebase/firebaseAuth';
import { onAuthStateChanged, User } from 'firebase/auth';

export const AuthContext = createContext<User | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userAuth, setUserAuth] = useState<User | null>(null);

  useEffect(() => {
    const authInit = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserAuth(user);
      } else {
        console.error('User not logged in');
      }
    });

    return () => authInit();
  }, []);

  return <AuthContext.Provider value={userAuth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
