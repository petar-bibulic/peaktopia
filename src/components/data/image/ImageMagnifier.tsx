'use client';

import { useState, FC, ReactNode } from 'react';

type Props = {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  zoomLevel?: number;
  show?: boolean;
};

const ImageMagnifier: FC<Props> = ({ children, zoomLevel = 3, show = true }) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [magnifierSize, setMagnifierSize] = useState(300);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [positionTop, setPositionTop] = useState(150);

  let src = '';

  if (children) {
    if (Array.isArray(children)) {
      src = children[0]?._payload?.value?.props?.src;
    } else {
      /* @ts-expect-error Server Component */
      src = children?._payload?.value?.props?.src;
    }
  }

  function updateMagnifier(e: React.MouseEvent | React.WheelEvent) {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();

    if (!showMagnifier) {
      setSize([width, height]);
      setShowMagnifier(true);
    }

    // cursor position in image
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;
    setXY([x, y]);

    if (y < magnifierSize - 15 + window.scrollY && x > width - magnifierSize + 15) {
      setPositionTop(-magnifierSize * 1.1);
    } else {
      setPositionTop(0);
    }
  }

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={(e) => {
        const { width, height } = e.currentTarget.getBoundingClientRect();
        setSize([width, height]);
        setShowMagnifier(true);
        setMagnifierSize(width > height ? 0.3 * width : 0.3 * height);
      }}
      onMouseMove={(e) => {
        updateMagnifier(e);
      }}
      onMouseLeave={() => {
        setShowMagnifier(false);
      }}
    >
      {showMagnifier && show && src && (
        <div
          className="z-50 bg-no-repeat opacity-90 absolute border-2 border-base-content pointer-events-none transition duration-300 ease-in-out"
          style={{
            height: `${magnifierSize}px`,
            width: `${magnifierSize}px`,
            // top: `${y - magnifierHeight / 2}px`,
            // left: `${x - magnifierWidth / 2}px`,
            transform: `translate(0px, ${-positionTop}px)`,
            top: `${window.scrollY - 15}px`,
            right: '-15px',
            backgroundImage: `url('${src}')`,
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifierSize / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierSize / 2}px`,
          }}
        >
          <div className="absolute inset-0 left-1/2 w-0 h-full border border-base-content transform -translate-x-1/2 group-hover:block"></div>
          <div className="absolute inset-0 left-1/2 rotate-90 w-0 h-full border border-base-content transform -translate-x-1/2 group-hover:block"></div>
        </div>
      )}
      {children as ReactNode}
    </div>
  );
};

export default ImageMagnifier;
