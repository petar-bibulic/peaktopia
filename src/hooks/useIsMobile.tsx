'use client';

import { useState, useEffect } from 'react';

export default function useIsMobile() {
  const wndw: Window | null = typeof window === 'undefined' ? null : window;
  const widthSm = wndw ? wndw.innerWidth < 768 : false;

  const [isMobile, setIsMobile] = useState(widthSm);

  const onResize = () => {
    setIsMobile(widthSm);
  };

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
}
