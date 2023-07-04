'use client';

import { useState, useEffect } from 'react';
import { AiFillFacebook, AiFillGithub } from 'react-icons/ai';

type Props = {};

const LoginForm = (props: Props) => {
  return (
    <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
      <form>
        <div className="relative">
          <input type="text" placeholder="Username" className="input input-bordered w-full mb-4" />
          <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
            Floating outlined
          </label>
        </div>
        <input type="password" placeholder="Password" className="input input-bordered  w-full mb-4" />
        <div className="mb-6 flex items-center justify-between">
          <div className="form-control">
            <label className="cursor-pointer label">
              <input type="checkbox" defaultChecked className="checkbox checkbox-primary mr-2" />
              <span className="">Remember me</span>
            </label>
          </div>
          <a href="#!" className="link-primary">
            Forgot password?
          </a>
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Sign in
        </button>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
        </div>
        <a className="btn btn-secondary w-full mb-2" href="#" role="button">
          <AiFillFacebook className="mx-2 text-2xl" />
          Continue with Facebook
        </a>
        <a className="btn btn-secondary w-full" href="#" role="button" data-te-ripple-init data-te-ripple-color="light">
          <AiFillGithub className="mx-2 text-2xl" />
          Continue with Github
        </a>
      </form>
    </div>
  );
};

export default LoginForm;
