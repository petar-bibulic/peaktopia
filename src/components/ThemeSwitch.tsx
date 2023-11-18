'use client';

import useGlobalStore from '@hooks/useGlobalStore';
import { useEffect, useState } from 'react';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';

type Props = {};

const ThemeSwitch = (props: Props) => {
  const theme = useGlobalStore((state) => state.theme);
  const setTheme = useGlobalStore((state) => state.setTheme);
  let isDark = theme === 'dark';

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    const html = document && document.querySelector('html');
    html?.setAttribute('data-theme', theme);
    isDark ? html?.setAttribute('class', 'dark') : html?.setAttribute('class', '');
  }, [theme]);

  return (
    <label htmlFor="theme-switch" className="swap swap-rotate mx-2">
      <input id="theme-switch" type="checkbox" onClick={toggleTheme} defaultChecked={!isDark} />
      <MdOutlineLightMode className="swap-on text-2xl text-base-content" />
      <MdOutlineNightlight className="swap-off text-2xl text-base-content" />
    </label>
  );
};

export default ThemeSwitch;
