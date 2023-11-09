'use client';

import useGlobalStore from '@hooks/useGlobalStore';
import { useEffect, useState } from 'react';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';

type Props = {};

const ThemeSwitch = (props: Props) => {
  const theme = useGlobalStore((state) => state.theme);
  const setTheme = useGlobalStore((state) => state.setTheme);
  let isDark = theme === 'night';

  const toggleTheme = () => {
    setTheme(theme === 'night' ? 'fantasy' : 'night');
  };

  useEffect(() => {
    const html = document && document.querySelector('html');
    html?.setAttribute('data-theme', theme);
    isDark ? html?.setAttribute('class', 'dark') : html?.setAttribute('class', '');
  }, [theme]);

  return (
    <label className="swap swap-rotate mx-2">
      <input type="checkbox" onClick={toggleTheme} />

      {!isDark ? (
        <MdOutlineLightMode className=" text-2xl text-black" />
      ) : (
        <MdOutlineNightlight className=" text-2xl text-white" />
      )}
    </label>
  );
};

export default ThemeSwitch;
