'use client';

import { useState } from 'react';
import { signIn } from '@firebase/firebaseAuth';
import Link from 'next/link';
import GoogleLoginButton from './GoogleLoginButton';
import FacebookLoginButton from './FacebookLoginButton';
import GithubLoginButton from './GithubLoginButton';
import { GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';

type Props = {};

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const LoginForm = (props: Props) => {
  const [email, setEmail] = useState(' ');
  const [password, setPassword] = useState('');

  function handleEmail(event: React.FormEvent<HTMLInputElement>): void {
    setEmail(event.currentTarget.value);
  }

  function handlePassword(event: React.FormEvent<HTMLInputElement>): void {
    setPassword(event.currentTarget.value);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { result, error } = await signIn(email, password);
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
        <div className="mb-6 flex items-center justify-between">
          <div className="form-control">
            <label className="cursor-pointer label">
              <input type="checkbox" defaultChecked className="checkbox checkbox-primary mr-2" />
              <span className="">Remember me</span>
            </label>
          </div>
          <Link href="#" className="link-primary">
            Forgot password?
          </Link>
        </div>
        <div className="mb-6 flex items-center justify-between">
          Don&apos;t have an account yet?
          <Link href="/auth/register" className="link-primary">
            Register
          </Link>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Sign in
        </button>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
        </div>
        <GoogleLoginButton provider={googleProvider} />
        <FacebookLoginButton provider={facebookProvider} />
        <GithubLoginButton provider={githubProvider} />
      </form>
    </div>
  );
};

export default LoginForm;
