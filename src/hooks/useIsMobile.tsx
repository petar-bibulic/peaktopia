'use client';

import { useState, useEffect } from 'react';

export default function useIsMobile() {
  const windowObj: Window | null = typeof window !== 'undefined' ? window : null;
  const [isMobile, setIsMobile] = useState(windowObj ? windowObj.innerWidth < 768 : false);

  const onResize = () => {
    setIsMobile(windowObj ? windowObj.innerWidth < 768 : false);
  };

  useEffect(() => {
    windowObj?.addEventListener('resize', onResize);

    return () => {
      windowObj?.removeEventListener('resize', onResize);
    };
  }, []);

  return isMobile;
}
