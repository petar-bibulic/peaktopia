import { Fragment } from 'react';
import { Cross, Rectangle } from 'recharts';
import { XDOMAIN_RANGE, YDOMAIN_RANGE } from '@utils/constants';

type PointPayloadType = {
  x: number;
  y: number;
  name: string;
};

const CustomCross = (props: any) => {
  const { styling, active, step, rangeData, width, height } = props;
  const strokeStyle = styling.stroke;
  const strokeStyleActive = styling.activeStroke;

  const nativePeaks = rangeData.map((value: { name: string; x: number; y: number }) => {
    return {
      x: (value.x / XDOMAIN_RANGE[1]) * width,
      y: (1 - value.y / YDOMAIN_RANGE[1]) * height,
      name: value.name,
    };
  });

  return (
    <>
      {nativePeaks.map((point: PointPayloadType, index: number) => (
        <Fragment key={`div-${index}`}>
          <Cross
            x={point.x}
            y={point.y}
            width={20}
            height={20}
            top={point.y - 10}
            left={point.x - 10}
            stroke={point.name.toLowerCase() === active?.name.toLowerCase() ? strokeStyleActive : strokeStyle}
          />
          <Rectangle
            x={point.x - 10}
            y={point.y - 10}
            width={20}
            height={20}
            fillOpacity={0}
            stroke={point.name.toLowerCase() === active?.name.toLowerCase() ? strokeStyleActive : strokeStyle}
            style={step < 3 ? { cursor: 'pointer' } : {}}
          />
        </Fragment>
      ))}
    </>
  );
};

export default CustomCross;
