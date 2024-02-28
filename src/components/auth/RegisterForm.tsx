'use client';

import { useState } from 'react';
import { signUp } from '@firebaseApp/authUtils';
import { facebookProvider, githubProvider, googleProvider } from '@firebaseApp/config';
import { oauthSignIn } from '@firebaseApp/authUtils';
import Link from 'next/link';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { GoogleLoginButton, FacebookLoginButton, GithubLoginButton } from '@components/auth/OAuthLoginButton';
import { toast, Theme } from 'react-toastify';
import useIsMobile from '@hooks/useIsMobile';
import useGlobalStore from '@hooks/useGlobalStore';

type Props = {};

const LoginForm = (props: Props) => {
  const isMobile = useIsMobile();
  const theme = useGlobalStore((state) => state.theme);
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleEmail(event: React.FormEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }

  function handlePassword(event: React.FormEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
  }

  function handleConfirmPassword(event: React.FormEvent<HTMLInputElement>): void {
    setConfirmPassword(event.currentTarget.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const html = document && document.documentElement;
    const theme = html?.getAttribute('data-theme');
    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        theme: theme as Theme,
      });
      return;
    }
    const toastId = toast.loading('Please wait...', { theme: theme as Theme });
    const { result, error } = await signUp(email, password);
    if (result) {
      toast.update(toastId, {
        render: 'Registration successful',
        type: 'success',
        isLoading: false,
        progress: undefined,
        theme: theme as Theme,
      });
    } else if (error) {
      toast.update(toastId, {
        render: error.message,
        type: 'error',
        isLoading: false,
        progress: undefined,
        theme: theme as Theme,
      });
    }
  };

  const toastyClickHandler = async (provider: GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider) => {
    const promiseFunc = oauthSignIn.bind(null, provider)(isMobile);
    let message: string = 'Log in successful';

    if (isMobile) message = 'Redirecting shortly';

    toast.promise(
      promiseFunc,
      {
        pending: 'Waiting to log in...',
        success: message,
        error: 'Failed to log in',
      },
      { theme: theme as Theme }
    );
    return promiseFunc;
  };

  return (
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12 z-10">
      <form onSubmit={handleSubmit}>
        <div className="relative mb-2">
          <input
            id="input-email"
            type="text"
            placeholder=" "
            className="input bg-base-200 dark:bg-neutral-focus w-full mb-4 peer z-10 text-base-content"
            onChange={handleEmail}
          />
          <label
            htmlFor="input-email"
            className={`bg-base-200 dark:bg-neutral-focus absolute left-1 rounded-2xl text-base-content duration-300
            transform -translate-y-5 scale-75 top-1.5 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 pointer-events-none `}
          >
            Email
          </label>
        </div>
        <div className="relative mb-2">
          <input
            id="input-password"
            type="password"
            placeholder=" "
            className="input bg-base-200 dark:bg-neutral-focus w-full mb-4 peer z-10 text-base-content"
            onChange={handlePassword}
          />
          <label
            htmlFor="input-password"
            className={`bg-base-200 dark:bg-neutral-focus absolute left-1 rounded-2xl text-base-content duration-300
            transform -translate-y-5 scale-75 top-1.5 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 pointer-events-none `}
          >
            Password
          </label>
        </div>
        <div className="relative mb-2">
          <input
            id="input-confirm-password"
            type="password"
            placeholder=" "
            className="input bg-base-200 dark:bg-neutral-focus w-full mb-4 peer z-10 text-base-content"
            onChange={handleConfirmPassword}
          />
          <label
            htmlFor="input-confirm-password"
            className={`bg-base-200 dark:bg-neutral-focus absolute left-1 rounded-2xl text-base-content duration-300
            transform -translate-y-5 scale-75 top-1.5 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 pointer-events-none `}
          >
            Confirm Password
          </label>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-base-content">Already have an account?</span>
          <Link href="/auth/login" className="link-primary">
            Login
          </Link>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold text-base-content">OR</p>
        </div>
        <GoogleLoginButton clickHandler={() => toastyClickHandler(googleProvider)} />
        <FacebookLoginButton clickHandler={() => toastyClickHandler(facebookProvider)} />
        <GithubLoginButton clickHandler={() => toastyClickHandler(githubProvider)} />
      </form>
    </div>
  );
};

export default LoginForm;
