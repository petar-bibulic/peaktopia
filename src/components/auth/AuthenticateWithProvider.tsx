'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GoogleLoginButton, FacebookLoginButton, GithubLoginButton } from '@components/auth/OAuthLoginButton';
import { useEffect, useState } from 'react';
import { linkProvidersSignIn } from '@firebaseAuth/authUtils';
import { FirebaseError } from '@firebase/util';
import { getProvider } from '@firebaseAuth/authUtils';
import { useAuthContext } from '@store/AuthContext';

type Props = {};

type ProviderType = {
  linkedProvider: string;
  credentialError: FirebaseError;
};

const getProviderLoginButton = (providerData: ProviderType): JSX.Element => {
  const { linkedProvider, credentialError } = providerData;
  const provider = getProvider(linkedProvider);

  if (!provider || !credentialError) {
    return <div>No provider available</div>;
  }

  const clickHandleFunction = linkProvidersSignIn.bind(null, provider, credentialError);

  switch (linkedProvider.split('.')[0]) {
    case 'google':
      return <GoogleLoginButton clickHandler={clickHandleFunction} />;
    case 'facebook':
      return <FacebookLoginButton clickHandler={clickHandleFunction} />;
    case 'github':
      return <GithubLoginButton clickHandler={clickHandleFunction} />;
    default:
      return <div>No provider available</div>;
  }
};

const AuthenticateWithProvider = (props: Props) => {
  const [provider, setProvider] = useState<ProviderType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
    if (!isLoading && user) {
      // add timeout and toast notification before redirecting
      router.push('/');
    }
  }, [user]);

  useEffect(() => {
    const loginProvider = typeof window !== 'undefined' ? sessionStorage.getItem('loginProvider') : null;
    const providerObject: ProviderType | null = loginProvider && JSON.parse(loginProvider);

    providerObject && setProvider(providerObject);
  }, []);

  return (
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12 z-10">
      <div className="relative mb-4">
        {provider && (
          <div>
            <p className="my-4">
              It looks like your email is already registered with
              <span className="font-bold text-warning">&nbsp;{provider.linkedProvider.split('.')[0]}</span>
            </p>
            <p className="my-4">
              Sign in to link your account with
              <span className="font-bold text-warning">&nbsp;{provider.linkedProvider}</span>
              &nbsp;
            </p>
          </div>
        )}
      </div>
      {provider && getProviderLoginButton(provider)}
      <div className="mt-6 flex items-center justify-between">
        Don&apos;t have an account yet?
        <Link href="/auth/register" className="link-primary">
          Register
        </Link>
      </div>
    </div>
  );
};

export default AuthenticateWithProvider;
