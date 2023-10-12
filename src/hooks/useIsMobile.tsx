'use client';

import { useState, useEffect } from 'react';

export default function useIsMobile() {
  const windowObj: Window | null = typeof window !== 'undefined' ? window : null;
  const widthSm = windowObj ? windowObj.innerWidth < 768 : false;

  const [isMobile, setIsMobile] = useState(widthSm);

  const onResize = () => {
    setIsMobile(widthSm);
  };

  useEffect(() => {
    windowObj?.addEventListener('resize', onResize);

    return () => {
      windowObj?.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
}
