'use client';

import { useState } from 'react';
import { signUp } from '@firebaseAuth/authUtils';
import { facebookProvider, githubProvider, googleProvider } from '@firebaseAuth/config';
import { oauthSignIn } from '@firebaseAuth/authUtils';
import Link from 'next/link';
import { GoogleLoginButton, FacebookLoginButton, GithubLoginButton } from '@components/auth/OAuthLoginButton';

type Props = {};

const LoginForm = (props: Props) => {
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
    if (password === confirmPassword) {
      const { result, error } = await signUp(email, password);
      return;
    }
    console.error("Paswords don't match");
  };

  return (
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12 z-10">
      <form onSubmit={handleSubmit}>
        <div className="relative mb-2">
          <input
            type="text"
            placeholder=" "
            className="input bg-neutral-focus w-full mb-4 peer z-10"
            onChange={handleEmail}
          />
          <label
            className={`bg-neutral-focus absolute left-1 rounded-2xl text-focus duration-300
            transform -translate-y-5 scale-75 top-1.5 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 pointer-events-none `}
          >
            Email
          </label>
        </div>
        <div className="relative mb-2">
          <input
            type="password"
            placeholder=" "
            className="input bg-neutral-focus w-full mb-4 peer z-10"
            onChange={handlePassword}
          />
          <label
            className={`bg-neutral-focus absolute left-1 rounded-2xl text-focus duration-300
            transform -translate-y-5 scale-75 top-1.5 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 pointer-events-none `}
          >
            Password
          </label>
        </div>
        <div className="relative mb-2">
          <input
            type="password"
            placeholder=" "
            className="input bg-neutral-focus w-full mb-4 peer z-10"
            onChange={handleConfirmPassword}
          />
          <label
            className={`bg-neutral-focus absolute left-1 rounded-2xl text-focus duration-300
            transform -translate-y-5 scale-75 top-1.5 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 pointer-events-none `}
          >
            Confirm Password
          </label>
        </div>
        <div className="mb-6 flex items-center justify-between">
          Already have an account?
          <Link href="/auth/login" className="link-primary">
            Login
          </Link>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
        </div>
        <GoogleLoginButton clickHandler={oauthSignIn.bind(null, googleProvider)} />
        <FacebookLoginButton clickHandler={oauthSignIn.bind(null, facebookProvider)} />
        <GithubLoginButton clickHandler={oauthSignIn.bind(null, githubProvider)} />
      </form>
    </div>
  );
};

export default LoginForm;
