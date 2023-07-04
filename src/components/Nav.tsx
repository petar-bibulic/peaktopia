'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import Provider from '@components/Provider';
import { LiaMountainSolid } from 'react-icons/lia';
import { RxHamburgerMenu } from 'react-icons/rx';

type Props = {};

const Nav = (props: Props) => {
  const [login, setLogin] = useState();

  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div className="flex flex-row items-center">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <RxHamburgerMenu className="text-xl" />
            </label>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link href="">Home</Link>
            </li>
            <li>
              <Link href="">Parent</Link>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <Link href="">About</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="flex items-center">
          <LiaMountainSolid className="text-4xl text-sky-400" />
          <span className="normal-case text-xl px-2 sm:hidden lg:flex">Peaktopia</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Register</a>
      </div>
    </nav>
  );
};

export default Nav;
