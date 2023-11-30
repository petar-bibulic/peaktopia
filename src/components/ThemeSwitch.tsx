'use client';

import useGlobalStore from '@hooks/useGlobalStore';
import { MdOutlineLightMode, MdOutlineNightlight } from 'react-icons/md';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

type Props = {};

const ThemeSwitch = (props: Props) => {
  const [cookies, setCookie] = useCookies(['peaktopiaTheme']);
  const html = typeof window !== 'undefined' ? document.documentElement : null;
  let theme = cookies.peaktopiaTheme || 'dark';
  const themeStore = useGlobalStore((state) => state.theme);
  const setTheme = useGlobalStore((state) => state.setTheme);

  const toggleTheme = () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    setCookie('peaktopiaTheme', theme);
    setTheme(theme);
  };

  useEffect(() => {
    html?.setAttribute('data-theme', theme);
    theme === 'dark' ? html?.setAttribute('class', 'dark') : html?.setAttribute('class', '');
    setTheme(theme);
  }, [theme]);

  return (
    <label htmlFor="theme-switch" className="swap swap-rotate mx-2">
      <input id="theme-switch" type="checkbox" onClick={toggleTheme} defaultChecked={theme !== 'dark'} />
      <MdOutlineLightMode className="swap-on text-2xl text-base-content" />
      <MdOutlineNightlight className="swap-off text-2xl text-base-content" />
    </label>
  );
};

export default ThemeSwitch;
